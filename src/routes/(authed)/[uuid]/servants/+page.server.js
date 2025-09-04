import {getInventoryDataByUserUUID} from '$lib/server/services/items'

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const inventoryData = await getInventoryDataByUserUUID(params.uuid)
    return {inventory:inventoryData}
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
    equipItem: async ({ request }) => {
        const data = await request.formData();
        const itemId = data.get('itemId');
        const servantId = data.get('servantId');
    }
}
