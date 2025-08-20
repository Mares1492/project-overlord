import { db } from "$lib/server/db/db.js";
import { getRandomServantName } from '$lib/server/handlers/generators.js';
import {servants,servantAttributes} from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const getRandomAttributeValue = () => {
    return Math.floor(Math.random() * 5) + 1;
}

const createServantAttributes = async (tx, servantId) => {
    await tx
    .insert(servantAttributes)
    .values({
        servantId: servantId,
        attributeId: 1, // strength
        value: getRandomAttributeValue()
    })
    await tx
    .insert(servantAttributes)
    .values({
        servantId: servantId,
        attributeId: 2, // dexterity
        value: getRandomAttributeValue()
    })
    await tx
    .insert(servantAttributes)
    .values({
        servantId: servantId,
        attributeId: 3, // intelligence
        value: getRandomAttributeValue()
    })
    await tx
    .insert(servantAttributes)
    .values({
        servantId: servantId,
        attributeId: 4, // agility
        value: getRandomAttributeValue()
    })
    await tx
    .insert(servantAttributes)
    .values({
        servantId: servantId,
        attributeId: 5, // endurance
        value: getRandomAttributeValue()
    })
}

// can be called as user creation transaction to create initial servant
// or as a separate transaction or db call to create a new servant for an existing user
/** 
 * @param {number} userId 
 */
export const createServant = async (userId, servantData, tx=db) => {

    const templateServant = {
        userId: userId,
        name: getRandomServantName(),
        raceId: servantData.raceId ?? 1, // Default

    };
    const [newServant] = await tx
        .insert(servants)
        .values(templateServant)
        .returning();
        
    createServantAttributes(tx, newServant.id);

    return newServant;
}

export const deleteServant = async (tx, servantId) => {
    await tx.delete(servantAttributes).where(eq(servantAttributes.servantId, servantId));
    return tx.delete(servants).where(eq(servants.id, servantId)).returning();
}

export const deleteServantsByUserId = async (tx, userId) => {
    const servantsToDelete = await tx
        .select()
        .from(servants)
        .where(eq(servants.userId, userId));

    if (servantsToDelete.length === 0) {
        throw new Error(`No servants found for user with ID ${userId}`);
    }

    const servantIds = servantsToDelete.map(servant => servant.id);
    for (const servantId of servantIds) {
        await deleteServant(tx, servantId);
    }
}
