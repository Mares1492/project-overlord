import { db } from "$lib/server/db/db.js";
import { count} from 'drizzle-orm';
import { keeps,barracks, extensionBuildings, barracksExtensionBuildings, treasuries, arsenals,academies,tombs } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const createTreasury = async (tx,keepId) => {
	return tx.insert(treasuries).values({ keepId, name:"treasury" }).returning();
}

export const createArsenal = async (tx,keepId) => {
	return tx.insert(arsenals).values({ keepId, name:"arsenal" }).returning();
}

export const createTomb = async (tx,keepId) => {
	return tx.insert(tombs).values({ keepId, name:"tomb" }).returning();
}

/**
 * @param {number} keepId
*/
export const createAcademy = async (tx,keepId) => {
	return tx.insert(academies).values({ keepId, name:"academy" }).returning();
}
export const createKeep = async (tx,userId) => {
	console.log("Creating keep for user:", userId);
	const [newKeep] = await tx.insert(keeps).values({ userId }).returning();
	console.log("New keep created:", newKeep);
	await createBuildings(tx, newKeep.id);
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
