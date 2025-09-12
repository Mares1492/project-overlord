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

export const addToTreasury = async (treasuryId,goldToAdd=0,gemsToAdd=0,tx=db) => {
    await tx.update(treasuries)
    .set({
        gold: sql`${treasuries.gold} + ${goldToAdd}`,
        gems: sql`${treasuries.gems} + ${gemsToAdd}`,
    })
    .where(eq(treasuries.id, treasuryId));
}

export const removeFromTreasury = async (treasuryId,goldToRemove=0,gemsToRemove=0,tx=db) => {
    await tx.update(treasuries)
    .set({
        gold: sql`GREATEST(${treasuries.gold} - ${goldToRemove}, 0)`,
        gems: sql`GREATEST(${treasuries.gold} - ${gemsToRemove}, 0)`,
    })
    .where(eq(treasuries.id, treasuryId));
}
