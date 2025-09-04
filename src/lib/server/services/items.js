import { db } from "$lib/server/db/db.js";
import {getUserByUUID} from "$lib/server/services/users"
import {items,inventoryItems,itemRarities, usableItems, attributes, userInventories, itemRarityTypes, slotTypes, itemAttributes} from "$lib/server/db/schema";
import { eq, sql} from "drizzle-orm";
import { ItemRarity, AttributeTypes } from '$lib/enums/enums';
import {getItemRandomAttributeValues} from '$lib/server/handlers/attributes'

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

const createItemAttributes = async (usableItemId,itemTypeId,rarityTypeId,tx=db) => {
    const attributes = getItemRandomAttributeValues(itemTypeId,rarityTypeId)
    for(const attribute in attributes){
        await tx
        .insert(itemAttributes)
        .values({
            usableItemId,
            attributeId: Number(attribute),
            value: attributes[attribute]
    })
    }
}   

/**@param {number} itemRarityId */
export const createUsableItem = async (itemRarityId,tx=db) => {
    const [newUsableItems] = await tx.insert(usableItems).values({itemRarityId}).returning();
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
			name:items.name,
            usableItemId: usableItems.id,
			itemType: {id:items.itemTypeId},
			slotType: {id:items.slotTypeId,name:slotTypes.name},
			rarity: {id:itemRarityTypes.id,name:itemRarityTypes.name},
			description: itemRarities.description,
			iconPath: items.iconPath
		})
		.from(inventoryItems)
		.innerJoin(usableItems,eq(inventoryItems.usableItemId,usableItems.id))
		.innerJoin(itemRarities,eq(itemRarities.id,usableItems.itemRarityId))
		.innerJoin(items,eq(items.id,itemRarities.itemId))
		.innerJoin(slotTypes,eq(slotTypes.id,items.itemTypeId))
		.innerJoin(itemRarityTypes,eq(itemRarities.itemRarityTypeId,itemRarityTypes.id))
		.where(eq(inventoryItems.userInventoryId,userInventory.id))

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
            ...item,
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
