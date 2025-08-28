import {getEventsByExpeditionUUID} from "$lib/server/handlers/events.js";
import { getExpeditionByUUID } from '$lib/server/router/expeditions';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const { expeditionUUID } = params;
    const events = getEventsByExpeditionUUID(expeditionUUID);
    const expedition = await getExpeditionByUUID(expeditionUUID)
    if (!expedition) {
        console.log("expedition is not found, redirecting to map")
        redirect(308,`/${params.uuid}/expeditions`)
    }
    expedition.events = events
    return {expedition}
}
