import { db } from "$lib/server/db/db.js";
import {getUserByUUID} from "$lib/server/router/users"
import {items,inventoryItems,itemRarities} from "$lib/server/db/schema";
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

export const getRandomItemOfGivenRarity = async (rarityTypeId) => {
    // random item of given rarity, in any category
    const [randomItem] = await db
        .select()
        .from(itemRarities)
        .where(eq(itemRarities.itemRarityTypeId,rarityTypeId))
        .orderBy(sql`random()`)
        .limit(1);
}
