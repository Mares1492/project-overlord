import { db } from "$lib/server/db/db.js";
import { eq,sql } from "drizzle-orm";
import { treasuries,keeps } from "../db/schema";

export const getTreasuryData = async (userId) => {
    const [treasuryData] = await db
        .select({
            gold: treasuries.gold,
            gems: treasuries.gems
        })
        .from(treasuries)
        .innerJoin(keeps,eq(keeps.userId,userId))
        .where(eq(treasuries.keepId,keeps.id)).limit(1)
    return treasuryData
}

export const addToTreasury = async (treasuryId,goldToAdd=0,gemsToAdd=0) => {
    await db.update(treasuries)
    .set({
        gold: sql`${treasuries.gold} + ${goldToAdd}`,
        gems: sql`${treasuries.gems} + ${gemsToAdd}`,
    })
    .where(eq(treasuries.id, treasuryId));
}
