import {getInventoryDataByUserUUID,equipItem} from '$lib/server/services/items'

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
        if (await equipItem(itemUUID,servantUUID)) {
            console.log("succ")
            return {error:false, message:`Item is equipped`}
        }
        console.log("fail")
        return {error:true, message:`Failed to equip item...`}
    }
}
