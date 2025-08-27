import {getAllLocations} from '$lib/server/router/locations'

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
    startExpedition: async ({ request }) => {
        const data = await request.formData();
        const servantUUID = data.get('servantUUID');
        const expeditionSettings = {
            task: data.get('task'),
            scale: data.get('scale'),
            approach: data.get('approach')
        };
    },
    completeExpedition: async ({ request }) => {
        const data = await request.formData();
        // TODO: call action to update DB
    }
}
