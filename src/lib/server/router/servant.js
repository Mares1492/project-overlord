import { db } from "$lib/server/db/db.js";
import { getRandomServantName } from '$lib/server/handlers/generators.js';
import {servants,servantAttributes} from "$lib/server/db/schema";

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

/** 
 * @param {number} userId 
 */
export const createServant = async (userId, servantData,tx=db) => {

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
