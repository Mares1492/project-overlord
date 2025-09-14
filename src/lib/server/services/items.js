import { db } from "$lib/server/db/db.js";
import {getUserByUUID} from "$lib/server/services/users"
import {items,inventoryItems,itemRarities, usableItems, attributes, userInventories, itemRarityTypes, slotTypes, itemAttributes, servantItems} from "$lib/server/db/schema";
import { eq, sql, and, notExists,exists} from "drizzle-orm";
import { ItemRarity } from '$lib/enums/enums';
import {getItemRandomAttributeValues} from '$lib/server/handlers/attributes'
import { getServantByUUID } from "./servants";

const itemDropChances = {
    [ItemRarity.common]: 0.5,
    [ItemRarity.uncommon]: 0.3,
    [ItemRarity.rare]: 0.1,
    [ItemRarity.epic]: 0.06,
    [ItemRarity.mythic]: 0.03,
    [ItemRarity.legendary]: 0.01,
}

export const getItemByUUID = async (itemUUID) => {
    const [item] = await db.select().from(items).where(eq(items.uuid,itemUUID))
    return item
}

export const addItemToInventory = async (itemUUID,userUUID) => {
    // This is for blind call from client. Only item and user uuids are known
    // TODO: Add permission checks
    const user = await getUserByUUID(userUUID)
    if (!user) {
        return {error:true,message:"Corrupt input data, user is not found"}
    }
    const item = await getItemByUUID(itemUUID)
    if (!item) {
        return {error:true,message:"Corrupt input data, item is not found"}
    }
    
    //const [inventory] = 

}

export const getRandomItemRarityByRarityTypeId = async (rarityTypeId) => {
    // random item of given rarity, in any category
    const [randomItem] = await db
        .select()
        .from(itemRarities)
        .where(eq(itemRarities.itemRarityTypeId,rarityTypeId))
        .orderBy(sql`random()`)
        .limit(1);
    return randomItem
}

const createItemAttributes = async (usableItemId,itemRarityId,tx=db) => {
    console.log("Creating item attributes")
    const [itemData] = await tx
        .select(
            {
                itemTypeId: items.itemTypeId,
                rarityTypeId: itemRarities.itemRarityTypeId
            }
        )
        .from(items)
        .innerJoin(itemRarities,eq(itemRarities.id,itemRarityId))
        .where(eq(items.id,itemRarities.itemId))
    
    const attributes = getItemRandomAttributeValues(itemData.itemTypeId,itemData.rarityTypeId)

    const attributeValues = []
    for(const attribute in attributes){
        attributeValues.push({
            usableItemId,
            attributeId: Number(attribute),
            value: attributes[attribute]
        })
    }
    await tx
        .insert(itemAttributes)
        .values(attributeValues)
}   

/**@param {number} itemRarityId */
export const createUsableItem = async (itemRarityId,tx=db) => {
    const [newUsableItems] = await tx.insert(usableItems).values({itemRarityId}).returning();
    // create attributes
    return newUsableItems
}

export const createRandomUsableItem = async (tx=db) => {
    const randomItemRarity = await getRandomItemRarityByRarityTypeId(ItemRarity.common)
    const usableItem = await createUsableItem(randomItemRarity.id,tx)
    return usableItem
}

/**
 * @param {number} userInventoryId
 * @param {number} usableItemId
 */
export const createInventoryItem = async (userInventoryId,usableItemId,tx=db) => {
    // this is the call itself (can be moved to repo section if created)
    const [newInventoryItem] = await tx.insert(inventoryItems).values({
            usableItemId,
            userInventoryId
    }).returning();
    return newInventoryItem
}

/** @param {number} userInventoryId @param {number} itemRarityId */
export const handleInventoryItemCreation = async (userInventoryId,itemRarityId,tx=db) => {
    const usableItem = await createUsableItem(itemRarityId,tx)
    if (!usableItem) {
        console.log("Failed creating usable item",usableItem)
    }
    await createItemAttributes(usableItem.id,itemRarityId,tx)
    await createInventoryItem(userInventoryId,usableItem.id,tx)
}

/** @param {number} userInventoryId */
export const handleRandomInventoryItemCreation = async (userInventoryId,tx=db) => {
    const usableItem = await createRandomUsableItem(tx)
    await createInventoryItem(userInventoryId,usableItem.id,tx)
}

export const getInventoryDataByUserUUID = async (userUUID) => {
	const user = await getUserByUUID(userUUID)
	const [userInventory] = await db.select().from(userInventories).where(eq(userInventories.userId,user.id))
	const inventoryItemsList = await db
		.select({
            uuid: usableItems.uuid,
			name:itemRarities.name,
            usableItemId: usableItems.id,
			itemType: {id:items.itemTypeId},
			slotType: {id:items.slotTypeId,name:slotTypes.name},
			rarity: {id:itemRarityTypes.id,name:itemRarityTypes.name, color:itemRarityTypes.color_hex},
			description: itemRarities.description,
			iconPath: items.iconPath
		})
		.from(inventoryItems)
		.innerJoin(usableItems,eq(inventoryItems.usableItemId,usableItems.id))
		.innerJoin(itemRarities,eq(itemRarities.id,usableItems.itemRarityId))
		.innerJoin(items,eq(items.id,itemRarities.itemId))
		.innerJoin(slotTypes,eq(slotTypes.id,items.slotTypeId))
		.innerJoin(itemRarityTypes,eq(itemRarities.itemRarityTypeId,itemRarityTypes.id))
		.where(
            and(
                eq(inventoryItems.userInventoryId,userInventory.id),
                notExists(
                    db.select({ one: sql`1` })
                    .from(servantItems)
                    .where(eq(servantItems.inventoryItemId, inventoryItems.id))
                )
            ))
    
    const inventoryItemsData = await Promise.all(inventoryItemsList.map(async item => {
        const itemAttributesList = await db
            .select({
                name: attributes.name,
                shortName: attributes.shortName,
                value: itemAttributes.value
            })
            .from(itemAttributes)
            .innerJoin(attributes, eq(itemAttributes.attributeId, attributes.id))
            .where(eq(itemAttributes.usableItemId, item.usableItemId));
        return {
            uuid: item.uuid,
            name: item.name,
            itemType: item.itemType,
            slotType: item.slotType,
            rarity: item.rarity,
            description: item.description,
            iconPath: item.iconPath,
            attributes: itemAttributesList,
        }
    }))
	const inventory = {
		maxSlots: userInventory.maxSlots,
		availableSlots: userInventory.availableSlots,
		items: inventoryItemsData
	}
	return inventory
}

export const deleteUserInventory = async (userId,tx=db) => {
    await tx.delete(userInventories).where(eq(userInventories.userId, userId));
}

/**@param {number} servantId @param {number} slotTypeId */
export const isItemSlotUsed = async (servantId,slotTypeId) => {
    const result = await db.select({id:servantItems.id}).from(servantItems)
        .where(and(
            eq(servantItems.servantId,servantId),
            exists(db
                .select({ one: sql`1` })
                .from(inventoryItems)
                .where(and(
                    eq(inventoryItems.id,servantItems.inventoryItemId),
                    exists(db
                        .select({ one: sql`1` })
                        .from(usableItems)
                        .where(and(
                            eq(usableItems.id,inventoryItems.usableItemId),
                            exists(db
                                .select({ one: sql`1` })
                                .from(itemRarities)
                                .where(and(
                                    eq(itemRarities.id,usableItems.itemRarityId),
                                    exists(db
                                        .select({ one: sql`1` })
                                        .from(items)
                                        .where(and(
                                            eq(items.id,itemRarities.itemId),
                                            eq(items.slotTypeId,slotTypeId)
                                        ))
                                    )
                                ))
                            )
                        ))
                    )
                ))
            )
        )
    ).limit(1)
    return result.length 
}

const equipItem = async (inventoryItem,servant) => {
    await db.insert(servantItems).values({inventoryItemId:inventoryItem.id,servantId:servant.id})
}

const unequipItem = async (inventoryItem,servant) => {
    await db.delete(servantItems).where(and(eq(servantItems.servantId,servant.id),eq(servantItems.inventoryItemId,inventoryItem.id)))
}

const getInventoryItemDataByUUID = async (itemUUID) => {
    const [inventoryItem] = await db 
        .select({
            id:inventoryItems.id,
            slotId: slotTypes.id
        })
        .from(inventoryItems)
        .innerJoin(usableItems,eq(usableItems.uuid,itemUUID))
        .innerJoin(itemRarities,eq(itemRarities.id,usableItems.itemRarityId))
        .innerJoin(items,eq(items.id,itemRarities.itemId))
        .innerJoin(slotTypes,eq(slotTypes.id,items.slotTypeId))
        .where(eq(inventoryItems.usableItemId,usableItems.id))
    return inventoryItem
}

export const handleItemEquipping = async (itemUUID,servantUUID) => {
    const servant = await getServantByUUID(servantUUID)
    const inventoryItem = await getInventoryItemDataByUUID(itemUUID)

    if (await isItemSlotUsed(servant.id,inventoryItem.slotId)) {
        unequipItem(inventoryItem,servant)
    }
    try {
        await equipItem(inventoryItem,servant)  
        return true 
    } catch (error) {
        return false
    }
}

        return false
    }
    await db.insert(servantItems).values({inventoryItemId:inventoryItem.id,servantId:servant.id})
    return true
}

export const getEquippedItemsByServantId = async (servantId) => {
    const servantItemsList = await db
		.select({
            uuid: usableItems.uuid,
			name: itemRarities.name,
            usableItemId: usableItems.id,
			itemType: {id:items.itemTypeId},
			slotType: {id:items.slotTypeId,name:slotTypes.name},
			rarity: {id:itemRarityTypes.id,name:itemRarityTypes.name, color:itemRarityTypes.color_hex},
			description: itemRarities.description,
			iconPath: items.iconPath
		})
		.from(servantItems)
        .innerJoin(inventoryItems,eq(inventoryItems.id,servantItems.inventoryItemId))
		.innerJoin(usableItems,eq(usableItems.id,inventoryItems.usableItemId))
		.innerJoin(itemRarities,eq(itemRarities.id,usableItems.itemRarityId))
		.innerJoin(items,eq(items.id,itemRarities.itemId))
		.innerJoin(slotTypes,eq(slotTypes.id,items.slotTypeId))
		.innerJoin(itemRarityTypes,eq(itemRarities.itemRarityTypeId,itemRarityTypes.id))
        .where(eq(servantItems.servantId,servantId))
    
    /**@type {Object<number,Object>} */
    const equippedItems = {}
    for (const item of servantItemsList) {
        equippedItems[item.slotType.id] = item
    }
    return equippedItems
}
