import { db } from "$lib/server/db/db.js";
import {expeditions} from "$lib/server/db/schema";
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
    // TODO: get user and servant by uuid
    // TODO: check if servant belongs to user
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

export const getExpeditionByUUID = (expeditionUUID) => {
    return db.select().from(expeditions).where(eq(expeditions.uuid,expeditionUUID))
}
