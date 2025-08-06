import {getEventsByExpeditionId} from "$lib/server/handlers/events.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const { expeditionId } = params;
    const events = getEventsByExpeditionId(expeditionId);
    return {events}
}
