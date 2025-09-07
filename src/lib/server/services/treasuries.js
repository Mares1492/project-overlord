import { db } from "$lib/server/db/db.js";
import { eq } from "drizzle-orm";
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
