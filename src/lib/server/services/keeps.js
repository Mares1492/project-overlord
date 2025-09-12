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
			[invertedBuildingTypes[BuildingTypes.keep]]:{ // using string key of building type
				id: keeps.id,
				name: sql`initcap(${keeps.name})`,
				lvl: keeps.lvl,
				upgradePrice: keepLevels.upgradePrice,
			},
			[invertedBuildingTypes[BuildingTypes.barracks]]:{ // making sure building type is added to BuildingTypes enum
				id: barracks.id,
				name: sql`initcap(${barracks.name})`,
				lvl: barracks.lvl,
				upgradePrice: barracksLevels.upgradePrice,
			},
			[invertedBuildingTypes[BuildingTypes.treasury]]:{
				id: treasuries.id,
				name: sql`initcap(${treasuries.name})`,
				lvl: treasuries.lvl,
				upgradePrice: treasuryLevels.upgradePrice,
			},
			[invertedBuildingTypes[BuildingTypes.arsenal]]:{
				id: arsenals.id,
				name: sql`initcap(${arsenals.name})`,
				lvl: arsenals.lvl,
				upgradePrice: arsenalsLevels.upgradePrice,
			},
			[invertedBuildingTypes[BuildingTypes.academy]]:{
				id: academies.id,
				name: sql`initcap(${academies.name})`,
				lvl: academies.lvl,
				upgradePrice: academyLevels.upgradePrice,
			},
			[invertedBuildingTypes[BuildingTypes.tomb]]:{
				id: tombs.id,
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

const upgradeKeep = async (buildingId) => {
	const [data] = await db
		.select({
			treasuryId: treasuries.id,
			gold: treasuries.gold,
			lvl: keeps.lvl,
			upgradePrice: keepLevels.upgradePrice
		})
		.from(keeps)
		.innerJoin(treasuries,eq(treasuries.keepId,keeps.id))
		.innerJoin(keepLevels,eq(keepLevels.id,keeps.lvl))
		.where(eq(keeps.id,buildingId)).limit(1)
	if (data.gold > (data.upgradePrice??Infinity)) {
		return await upgradeBuilding(keeps,buildingId,data.treasuryId,data.upgradePrice)
	}
	return false
}

const upgradeBarracks = async (buildingId) => {
	const [data] = await db
		.select({
			treasuryId: treasuries.id,
			gold: treasuries.gold,
			lvl: barracks.lvl,
			upgradePrice: barracksLevels.upgradePrice
		})
		.from(barracks)
		.innerJoin(keeps,eq(keeps.id,barracks.keepId))
		.innerJoin(treasuries,eq(treasuries.keepId,keeps.id))
		.innerJoin(barracksLevels,eq(barracksLevels.id,keeps.lvl))
		.where(eq(barracks.id,buildingId)).limit(1)

	if (data.gold > (data.upgradePrice??Infinity)) {
		return await upgradeBuilding(barracks,buildingId,data.treasuryId,data.upgradePrice)
	}
	return false
}

const upgradeTreasury = async (buildingId) => {
	const [data] = await db
		.select({
			treasuryId: treasuries.id,
			gold: treasuries.gold,
			lvl: treasuries.lvl,
			upgradePrice: treasuryLevels.upgradePrice
		})
		.from(treasuries)
		.innerJoin(keeps,eq(keeps.id,treasuries.keepId))
		.innerJoin(treasuryLevels,eq(treasuryLevels.id,treasuries.lvl))
		.where(eq(treasuries.id,buildingId)).limit(1)

	if (data.gold > (data.upgradePrice??Infinity)) {
		return await upgradeBuilding(treasuries,buildingId,data.treasuryId,data.upgradePrice)
	}
	return false
}

const upgradeBuilding = async (building,buildingId,treasuryId,price) => {
	if (!building || !buildingId || !treasuryId || !price) {
		return false
	}
	await db.transaction(async (tx) => {
		await removeFromTreasury(treasuryId,price,0,tx)
		// TODO: check if exists lvl+1
		await tx
			.update(building)
			.set({ lvl: sql`${building.lvl} + 1` })
			.where(eq(building.id, buildingId))
	})
	return true
}

/** @param {string} buildingType @param {number} buildingId */
export const handleBuildingUpgrade = async (buildingType,buildingId) => {
	switch (buildingType) {
		case invertedBuildingTypes[BuildingTypes.keep]:
			return await upgradeKeep(buildingId);
		case invertedBuildingTypes[BuildingTypes.barracks]:
			return await upgradeBarracks(buildingId);
		case invertedBuildingTypes[BuildingTypes.treasury]:
			return await upgradeTreasury(buildingId)
		case invertedBuildingTypes[BuildingTypes.academy]:
			// Yet to be implemented
		case invertedBuildingTypes[BuildingTypes.arsenal]:
			// Yet to be implemented
		case invertedBuildingTypes[BuildingTypes.tomb]:
			// Yet to be implemented
		default:
			console.log("Failded to upgrade building",buildingType,"with id:",buildingId)
			return false;
	}
}
