import { db } from '$lib/server/db/db';
import { sessions, users, userInventories} from '$lib/server/db/schema';
import {
	hashPassword,
	signAccessToken,
	signRefreshToken,
	verifyPassword
} from '$lib/server/auth';
import { error } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { generateDarkFantasyName } from '$lib/utils/nameGenerator.js';
import { eq } from 'drizzle-orm';
import { createKeep } from '$lib/server/services/keeps.js';
import { createServant } from '$lib/server/services/servants.js';
import { handleInventoryItemCreation } from '$lib/server/services/items';

const MAX_INVENTORY_SLOTS = 15
const DEFAULT_AVAILABLE_SLOTS = 8 

export const createInventory = async (userId, tx = db) => {
	const [newInventory] = await tx.insert(userInventories).values({
		userId: userId,
		availableSlots: DEFAULT_AVAILABLE_SLOTS,
		maxSlots: MAX_INVENTORY_SLOTS
	}).returning();
	if (newInventory) {
		console.log("New user inventory is created:",newInventory)
	}
	return newInventory
}

/**
 * @param email {string}
 * @param password {string}
 */
export const createUser = async (email, password) => {
	// Check if user already exists
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	if (existing.length) {
		throw error(409, 'Email already registered');
	}

	const passwordHash = await hashPassword(password);
	const newUserData = {
		uuid: randomUUID(),
		email,
		passwordHash,
		nickname: generateDarkFantasyName()
	};
	try {
		const newUser = await db.transaction(async (tx) => {
			const [createdUser] = await tx.insert(users).values(newUserData).returning();
			console.log(createdUser);
			console.log("Creating Keep...")
			await createKeep(tx,createdUser.id);
			// Create initial servants for the user
			// TODO: create one predefined servant and 2 random servants
			console.log("Creating servants")
			await createServant(createdUser.id, {}, tx);
			await createServant(createdUser.id, {}, tx);
			await createServant(createdUser.id, {vampire:true}, tx);
			console.log("Creating inventory...")
			const newInventory = await createInventory(createdUser.id, tx);
			console.log("Creating items...")
			// IDEA: create enums for popular item rarities to use in such scenarios
			await handleInventoryItemCreation(newInventory.id,3,tx) // Iron dagger | common
			await handleInventoryItemCreation(newInventory.id,3,tx) // Iron dagger | common
			await handleInventoryItemCreation(newInventory.id,3,tx) // Iron dagger | common
			await handleInventoryItemCreation(newInventory.id,5,tx) // Common hood | common
			await handleInventoryItemCreation(newInventory.id,9,tx) // Iron Gauntlets | common
			await handleInventoryItemCreation(newInventory.id,11,tx) // Steel Cuirass | uncommon
			return createdUser;
		});
		return {data:newUser, error:false, message: "User is successfully created"};
	} catch (error) {
		return {data:undefined, error:true, message: "Failed to create new user"}
	}
};

export const deleteUser = async (email, password) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	if (!user || !(await verifyPassword(password, user.passwordHash))) {
		throw error(401, 'Invalid credentials');
	}

	await logout(user);

	await db.transaction(async (tx) => {
		const deleted = await tx.delete(users).where(eq(users.id, user.id)).returning();
		if (!deleted.length) {
			throw error(401, 'Could not delete user');
		}
	});
};

export const login = async (email, password) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	if (!user || !(await verifyPassword(password, user.passwordHash))) {
		throw error(401, 'Invalid credentials');
	}

	return user;
};

export const logout = async (user) => {
	await db.delete(sessions).where(eq(sessions.userId, user.id));
};

export const createUserSession = async (user) => {
	const accessToken = signAccessToken({ id: user.id, email: user.email });
	const refreshToken = signRefreshToken({ id: user.id });

	// Remove any existing session
	await db.delete(sessions).where(eq(sessions.userId, user.id));

	await db.insert(sessions).values({
		refreshToken,
		userId: user.id,
		createdAt: new Date()
	});

	return [accessToken, refreshToken];
};

export const getUserFromSession = async (session) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, session.userId));

	return user;
};

export const getUserSessionByToken = async (refreshToken) => {
	const [session] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.refreshToken, refreshToken));

	return session;
};

export const getUserByUUID = async (userUUID) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.uuid,userUUID))
	if (!user) {
		console.log(`User with uuid: ${userUUID} is not found`)
	}
	return user;
}
