import { db } from "$lib/server/db/db.js";
import {expeditions,users,locations,servants,expeditionApproaches,expeditionTasks, expeditionScales} from "$lib/server/db/schema";
import {getUserByUUID} from "$lib/server/router/users"
import {getServantByUUID} from "$lib/server/router/servants"
import { eq } from "drizzle-orm";

const overviewTextMaxLen = 1000

const getDuration = (expScaleValue) => {
    switch (expScaleValue) {
        case 0:
            return 15;
        case 1:
            return 30;
        case 2:
            return 45;
        default:
            return 60;
    }
}

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

    const duration = getDuration(settings.scaleId)
    const [newExpedition] = await db.insert(expeditions).values(
        { 
            userId: user.id, 
            servantId: servant.id,
            locationId: locationId,
            endTime: new Date(Date.now() + (duration * 1000)),
            taskId: settings.taskId,
            approachId: settings.approachId,
            scaleId: settings.scaleId,
            overviewText
        })
        .returning();

    return newExpedition;
}

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
                status: expeditions.statusId,
                task: expeditionTasks.name,
                approach: expeditionApproaches.name,
                scale: expeditionScales.name
            }
        )
        .from(expeditions)
        .innerJoin(locations,eq(expeditions.locationId,locations.id))
        .innerJoin(servants,eq(servants.id,expeditions.servantId))
        .innerJoin(expeditionApproaches,eq(expeditionApproaches.id,expeditions.approachId))
        .innerJoin(expeditionTasks,eq(expeditionTasks.id,expeditions.taskId))
        .innerJoin(expeditionScales,eq(expeditionScales.id,expeditions.scaleId))
        .where(eq(expeditions.uuid,expeditionUUID))
    return expedition;
}

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
