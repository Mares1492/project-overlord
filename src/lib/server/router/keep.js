import { db } from "$lib/server/db/db.js";
import { keeps } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Create a new keep record for a user
export const createKeep = async (userId) => {
	return db.insert(keeps).values({ userId }).returning();
};

export const deleteKeep = async (tx,userId) => {
	const [keepToDelete] = await db.select().from(keeps).where(eq(keeps.userId, userId));
	const [barracksToDelete] = await db.select().from(barracks).where(eq(barracks.keepId, keepToDelete.id));
	await tx.delete(barracksExtensionBuildings).where(eq(barracksExtensionBuildings.barracksId, barracksToDelete.id));
	await tx.delete(arsenals).where(eq(arsenals.keepId, keepToDelete.id));
	await tx.delete(academies).where(eq(academies.keepId, keepToDelete.id));
	await tx.delete(tombs).where(eq(tombs.keepId, keepToDelete.id));
	await tx.delete(treasuries).where(eq(treasuries.keepId, keepToDelete.id));
	await tx.delete(barracks).where(eq(barracks.keepId, keepToDelete.id));
	return tx.delete(keeps).where(eq(keeps.userId, userId)).returning();
};

export const getKeep = async (userId) => {
	return db.query.keeps.findFirst({
		where: eq(keeps.userId, userId)
	});
};
