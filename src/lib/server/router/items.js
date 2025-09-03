import { db } from "$lib/server/db/db.js";
import {getUserByUUID} from "$lib/server/router/users"
import {items,inventoryItems,itemRarities, usableItems} from "$lib/server/db/schema";
import { eq, sql} from "drizzle-orm";
import { ItemRarity } from '$lib/enums/enums';

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
    
    // create 
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
    await createInventoryItem(userInventoryId,usableItem.id,tx)
}

/** @param {number} userInventoryId */
export const handleRandomInventoryItemCreation = async (userInventoryId,tx=db) => {
    const usableItem = await createRandomUsableItem(tx)
    await createInventoryItem(userInventoryId,usableItem.id,tx)
}
