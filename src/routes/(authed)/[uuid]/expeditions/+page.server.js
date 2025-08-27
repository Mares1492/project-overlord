import {getAllLocations} from '$lib/server/router/locations'
import {createExpedition} from '$lib/server/router/expeditions'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const locations = await getAllLocations()
    if (!locations) {
        return {error: true, message: "locations are missing"}
    }
    return {locations}
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
        console.log(newExpedition)
        return {newExpedition}
    },
    completeExpedition: async ({ request }) => {
        const data = await request.formData();
        // TODO: call action to update DB
    }
}
