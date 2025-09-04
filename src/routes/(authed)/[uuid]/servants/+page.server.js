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
        const itemUUID = data.get('itemUUID');
        const servantUUID = data.get('servantUUID');
        //equipItem(itemId,servantId)
        console.log("itemID:",itemUUID,"servantID:",servantUUID)
    }
}
