import {db} from "$lib/server/db/db.js";
import {keeps} from "$lib/server/db/schema.js";
import {eq} from "drizzle-orm";

export const createKeep = async (userId) => {
    await db.insert(keeps).values({userId: userId}).returning();
}

export const deleteKeep = async (userId) => {
    await db.delete(keeps).where(eq(keeps.userId, userId)).returning();
}

}