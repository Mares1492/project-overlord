import { db } from "$lib/server/db/db.js";
import { count} from 'drizzle-orm';
import { 
	keeps, users, barracks, extensionBuildings, barracksExtensionBuildings, 
	keepLevels,barracksLevels,academyLevels,arsenalsLevels,treasuryLevels,tombLevels,
	treasuries, arsenals,academies,tombs } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";

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
/**
 * @param {number} keepId
*/
export const createBarracks = async (tx,keepId) => {
	const [newBarracks] = await tx.insert(barracks).values({ keepId, name: "barracks" }).returning();
		
	const [extentions] = await tx.select({ count: count() }).from(extensionBuildings);

	const junctionRows = Array.from({ length: extentions.count }, (_, i) => ({
		barracksId: newBarracks.id,
		extensionBuildingId: i + 1
	}));

	if (junctionRows.length > 0) {
		await tx.insert(barracksExtensionBuildings).values(junctionRows);
	}
}

/**
 * @param {number} keepId
*/
export const createBuildings = async (tx,keepId) => {
	await createBarracks(tx, keepId);
	await createTreasury(tx, keepId);
	await createArsenal(tx, keepId);
	await createTomb(tx, keepId);
	await createAcademy(tx, keepId);
}

export const createKeep = async (tx,userId) => {
	console.log("Creating keep for user:", userId);
	const [newKeep] = await tx.insert(keeps).values({ userId }).returning();
	console.log("New keep created:", newKeep);
	await createBuildings(tx, newKeep.id);
};

export const deleteKeep = async (userId,tx=db) => {
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

export const getKeepData = async (userUUID) => {
	console.log("get keep data")
	const [keepData] = await db
		.select({
			keep:{
				name: sql`initcap(${keeps.name})`,
				lvl: keeps.lvl,
				upgradePrice: keepLevels.upgradePrice,
			},
			barracks:{
				name: sql`initcap(${barracks.name})`,
				lvl: barracks.lvl,
				upgradePrice: barracksLevels.upgradePrice,
			},
			treasury:{
				name: sql`initcap(${treasuries.name})`,
				lvl: treasuries.lvl,
				upgradePrice: treasuryLevels.upgradePrice,
			},
			arsenal:{
				name: sql`initcap(${arsenals.name})`,
				lvl: arsenals.lvl,
				upgradePrice: arsenalsLevels.upgradePrice,
			},
			academy:{
				name: sql`initcap(${academies.name})`,
				lvl: academies.lvl,
				upgradePrice: academyLevels.upgradePrice,
			},
			tomb:{
				name: sql`initcap(${tombs.name})`,
				lvl: tombs.lvl,
				upgradePrice: tombLevels.upgradePrice,
			},

		})
		.from(keeps)
		.innerJoin(users,eq(users.uuid,userUUID))
		.innerJoin(barracks,eq(barracks.keepId,keeps.id))
		.innerJoin(barracksLevels,eq(barracks.lvl,barracksLevels.id))
		.innerJoin(treasuries,eq(treasuries.keepId,keeps.id))
		.innerJoin(treasuryLevels,eq(treasuries.lvl,treasuryLevels.id))
		.innerJoin(arsenals,eq(arsenals.keepId,keeps.id))
		.innerJoin(arsenalsLevels,eq(arsenals.lvl,arsenalsLevels.id))
		.innerJoin(tombs,eq(tombs.keepId,keeps.id))
		.innerJoin(tombLevels,eq(tombs.lvl,tombLevels.id))
		.innerJoin(academies,eq(academies.keepId,keeps.id))
		.innerJoin(academyLevels,eq(academies.lvl,academyLevels.id))
		.innerJoin(keepLevels,eq(keeps.lvl,keepLevels.id))
		.where(eq(keeps.userId,users.id))

	return keepData
}
