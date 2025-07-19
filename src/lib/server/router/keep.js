import { db } from "$lib/server/db/db.js";
import { keeps } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Create a new keep record for a user
export const createKeep = async (userId) => {
	return db.insert(keeps).values({ userId }).returning();
};

// Delete a keep associated with a user
export const deleteKeep = async (userId) => {
	return db.delete(keeps).where(eq(keeps.userId, userId)).returning();
};

// Fetch the keep of a user
export const getKeep = async (userId) => {
	return db.query.keeps.findFirst({
		where: eq(keeps.userId, userId)
	});
};
