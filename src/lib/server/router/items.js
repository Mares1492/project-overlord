const itemDropChances = {
    [ItemRarity.common]: 0.5,
    [ItemRarity.uncommon]: 0.3,
    [ItemRarity.rare]: 0.1,
    [ItemRarity.epic]: 0.06,
    [ItemRarity.mythic]: 0.03,
    [ItemRarity.legendary]: 0.01,
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
