import { db } from "$lib/server/db/db.js";
import {expeditions,expeditionStatuses,users,locations,servants,expeditionApproaches,expeditionTasks, expeditionScales} from "$lib/server/db/schema";
import {getUserByUUID} from "$lib/server/router/users"
import {getServantByUUID} from "$lib/server/router/servants"
import { eq, and, not, desc } from "drizzle-orm";

const overviewTextMaxLen = 1000

/** @param {number} expScaleValue */
const getEndTime = (expScaleValue) => {
    let time = Date.now()
    switch (expScaleValue) {
        case 1:
            time += 30000;
            break;
        case 2:
            time += 60000;
            break;
        case 3:
            time += 300000;
            break;
        default:
            time += 600000;
            break;
    }
    return new Date(time)
}

/**
 * @typedef {Object} settings
 * @property {number} scaleId
 * @property {number} taskId
 * @property {number} approachId
 * 
 * @param {string} userUUID 
 * @param {string} servantUUID
 * @param {string} overviewText 
 * @param {number} locationId
 * @param {settings} settings
 */
export const createExpedition = async (userUUID,locationId,servantUUID,settings,overviewText) => {
    const user = await getUserByUUID(userUUID)
    const servant = await getServantByUUID(servantUUID)
    if (servant.userId !== user.id) {
        throw new Error("Servant does not belong to user");
    }
    overviewText = 
        overviewText.length > overviewTextMaxLen 
        ? overviewText.slice(0, overviewTextMaxLen) 
        : overviewText;

    const newExpedition = await db.transaction(async (tx) => {
        const [newExpedition] = await tx.insert(expeditions).values(
            { 
                userId: user.id, 
                servantId: servant.id,
                locationId: locationId,
                endTime: getEndTime(Number(settings.scaleId)),
                taskId: settings.taskId,
                approachId: settings.approachId,
                scaleId: settings.scaleId,
                overviewText
            })
            .returning();

        await tx
            .update(servants)
            .set({ statusId: 2 })
            .where(eq(servants.id, newExpedition.servantId));

        await tx
            .insert(expeditionLoots)
            .values(
                { 
                    expeditionId: newExpedition.id
                })

        return newExpedition
    });
    return newExpedition;
}

/**
 * @param {string} expeditionUUID 
 */
export const completeExpedition = async (expeditionUUID) => {
    // TODO: add check for expedition of user
    await db.transaction(async (tx) => {
        const [updatedExpedition] = await tx
            .update(expeditions)
            .set({ statusId: 3 })   // completed
            .where(eq(expeditions.uuid, expeditionUUID))
            .returning();
        await tx
            .update(servants)
            .set({ statusId: 1 }) //idle
            .where(eq(servants.id, updatedExpedition.servantId));
    })
}

/**
 * @param {string} expeditionUUID 
 */
export const archiveExpedition = async (expeditionUUID) => {
    // TODO: add check for expedition of user
    await db.transaction(async (tx) => {
        await tx
            .update(expeditions)
            .set({ statusId: 4 })   // completed
            .where(eq(expeditions.uuid, expeditionUUID));
    })
    
}

/**
 * @param {string} expeditionUUID 
 */
export const getExpeditionByUUID = async (expeditionUUID) => {
    const [expedition] = await db
        .select(
            {
                uuid:expeditions.uuid,
                location: {name:locations.name},
                startTime:expeditions.startTime,
                endTime: expeditions.endTime,
                overviewText: expeditions.overviewText,
                servant: {name:servants.name,uuid:servants.uuid},
                status: {id: expeditions.statusId, name:expeditionStatuses.name},
                task: expeditionTasks.name,
                approach: expeditionApproaches.name,
                scale: expeditionScales.name
            }
        )
        .from(expeditions)
        .innerJoin(locations,eq(expeditions.locationId,locations.id))
        .innerJoin(servants,eq(servants.id,expeditions.servantId))
        .innerJoin(expeditionStatuses,eq(expeditionStatuses.id,expeditions.statusId))
        .innerJoin(expeditionApproaches,eq(expeditionApproaches.id,expeditions.approachId))
        .innerJoin(expeditionTasks,eq(expeditionTasks.id,expeditions.taskId))
        .innerJoin(expeditionScales,eq(expeditionScales.id,expeditions.scaleId))
        .where(eq(expeditions.uuid,expeditionUUID))
    return expedition;
}

/**
 * @param {string} userUUID 
 */
export const getExpeditionsByUserUUID = (userUUID) => {
    return db
        .select({
            uuid:expeditions.uuid,
            location: {name:locations.name},
            startTime:expeditions.startTime,
            endTime: expeditions.endTime,
            overviewText: expeditions.overviewText,
            servant: {name:servants.name},
            status: expeditions.statusId,
            task: expeditionTasks.name,
            approach: expeditionApproaches.name,
            scale: expeditionScales.name
        })
        .from(expeditions)
        .innerJoin(users,eq(users.uuid,userUUID))
        .innerJoin(locations,eq(expeditions.locationId,locations.id))
        .innerJoin(servants,eq(servants.id,expeditions.servantId))
        .innerJoin(expeditionApproaches,eq(expeditionApproaches.id,expeditions.approachId))
        .innerJoin(expeditionTasks,eq(expeditionTasks.id,expeditions.taskId))
        .innerJoin(expeditionScales,eq(expeditionScales.id,expeditions.scaleId))
        .where(eq(expeditions.userId,users.id))
}

/**
 * @param {string} userUUID 
 */
export const getOngoingExpeditionsByUserUUID = (userUUID) => {
    return db
        .select({
            uuid:expeditions.uuid,
            location: {name:locations.name},
            startTime:expeditions.startTime,
            endTime: expeditions.endTime,
            overviewText: expeditions.overviewText,
            servant: {name:servants.name},
            status: expeditions.statusId,
            task: expeditionTasks.name,
            approach: expeditionApproaches.name,
            scale: expeditionScales.name
        })
        .from(expeditions)
        .innerJoin(users,eq(users.uuid,userUUID))
        .innerJoin(locations,eq(expeditions.locationId,locations.id))
        .innerJoin(servants,eq(servants.id,expeditions.servantId))
        .innerJoin(expeditionApproaches,eq(expeditionApproaches.id,expeditions.approachId))
        .innerJoin(expeditionTasks,eq(expeditionTasks.id,expeditions.taskId))
        .innerJoin(expeditionScales,eq(expeditionScales.id,expeditions.scaleId))
        .innerJoin(expeditionStatuses,
            and(
                not(eq(expeditionStatuses.id,1)), // not idle
                not(eq(expeditionStatuses.id,4)) // not archived
            )
        )
        .where(
            and(
                eq(expeditions.userId,users.id),
                eq(expeditions.statusId,expeditionStatuses.id)
            )
        )
        .orderBy(desc(expeditions.startTime));
}
