import { db } from "$lib/server/db/db.js";
import {RaceTypes, ServantStatus} from '$lib/enums/enums'
import { getRandomServantName } from '$lib/server/handlers/generators.js';
import {servants,servantAttributes, races, attributes,users,servantStatuses} from "$lib/server/db/schema";
import { eq,count,and } from "drizzle-orm";
import {getRandomServantAttributeValues} from '$lib/server/handlers/attributes'
import {AttributeTypes} from '$lib/enums/enums'

const createServantAttributes = async (tx, servantId) => {
    const attributeValues = getRandomServantAttributeValues({
        [AttributeTypes.strength]: true,
        [AttributeTypes.dexterity]: true,
        [AttributeTypes.intelligence]: true,
        [AttributeTypes.agility]: true,
        [AttributeTypes.endurance]: true,
    },10)

    await tx
    .insert(servantAttributes)
    .values([
        {
            servantId: servantId,
            attributeId: AttributeTypes.strength,
            value: attributeValues[AttributeTypes.strength]
        },
        {
            servantId: servantId,
            attributeId: AttributeTypes.dexterity, 
            value: attributeValues[AttributeTypes.dexterity]
        },
        {
            servantId: servantId,
            attributeId: AttributeTypes.intelligence,
            value: attributeValues[AttributeTypes.intelligence]
        },
        {
            servantId: servantId,
            attributeId: AttributeTypes.agility,
            value: attributeValues[AttributeTypes.agility]
        },
        {
            servantId: servantId,
            attributeId: AttributeTypes.endurance, 
            value: attributeValues[AttributeTypes.endurance]
        }
    ])
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
        raceId: servantData.raceId ?? RaceTypes.human,
        vampire: servantData.vampire ?? false,
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

export const deleteServantsByUserId = async (userId,tx=db) => {
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

export const setServantStatus = async (servantId, statusIdToSet) => {
    return db
        .update(servants)
        .set({ statusId: statusIdToSet })
        .where(eq(servants.id, servantId))
}

export const getServantByUUID = async (servantUUID) => {
    return db
        .select()
        .from(servants)
        .where(eq(servants.uuid, servantUUID))
        .then(rows => rows[0]);
}

export const getServantsByUserUUID = async (userUUID) => {
    const [user] = await db
        .select({id:users.id})
        .from(users)
        .where(eq(users.uuid, userUUID));
    
    const servantList = await db
        .select({
            id: servants.id,
            vampire: servants.vampire,
            uuid: servants.uuid,
            name: servants.name,
            race: races.name,
            status: {id:servantStatuses.id, name:servantStatuses.name}
        })
        .from(servants)
        .innerJoin(races, eq(servants.raceId,races.id))
        .innerJoin(servantStatuses, eq(servantStatuses.id, servants.statusId))
        .where(eq(servants.userId, user.id));

    const servantData = await Promise.all(servantList.map(async servant => {
        const servantAttributesList = await db
            .select({
                name: attributes.name,
                shortName: attributes.shortName,
                value: servantAttributes.value
            })
            .from(servantAttributes)
            .innerJoin(attributes, eq(servantAttributes.attributeId, attributes.id))
            .where(eq(servantAttributes.servantId, servant.id));
        return {
            ...servant,
            attributes: servantAttributesList,
        }
    }))
    const [availableServants] = await db
        .select({ count: count() })
        .from(servants)
        .where(and(eq(servants.statusId,ServantStatus.idle),eq(servants.userId,user.id)))
    return {servants:servantData,availableServants:availableServants.count};
}
