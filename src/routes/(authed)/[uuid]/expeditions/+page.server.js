import {getAllLocations} from '$lib/server/router/locations'
import {createExpedition,getOngoingExpeditionsByUserUUID,completeExpedition,archiveExpedition} from '$lib/server/router/expeditions'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const locations = await getAllLocations()
    const expeditions = await getOngoingExpeditionsByUserUUID(params.uuid)
    if (!expeditions) {
        return {error: true, message: "expeditions are missing"}
    }
    if (!locations) {
        return {error: true, message: "locations are missing"}
    }
    return {locations,expeditions}
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
    startExpedition: async ({ request,params }) => {
        const data = await request.formData();
        const userUUID = params.uuid;
        const servantUUID = data.get('servantUUID');
        const locationId = data.get('locationId');
        const expeditionSettings = {
            taskId: data.get('taskId'),
            scaleId: data.get('scaleId'),
            approachId: data.get('approachId')
        };
        const overviewText = data.get('overviewText')
        const newExpedition = await createExpedition(
            userUUID,
            locationId,
            servantUUID,
            expeditionSettings,
            overviewText
        )
        if (!newExpedition) {
            return {error:true,message:"Could not create expedition"}
        }
    },
    completeExpedition: async ({ request }) => {
        const data = await request.formData();
        /** @type {string} */
        const expeditionUUID = data.get('expeditionUUID') ?? ""
        await completeExpedition(expeditionUUID)
    },
    archiveExpedition: async ({params, request }) => {
        const data = await request.formData();
        /** @type {string} */
        const expeditionUUID = data.get('expeditionUUID') ?? ""
        await archiveExpedition(expeditionUUID)
    }
}
