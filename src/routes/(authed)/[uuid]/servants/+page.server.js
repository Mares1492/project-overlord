import {getInventoryDataByUserUUID,handleItemEquipping,handleItemUnequipping} from '$lib/server/services/items'

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
        if (await handleItemEquipping(itemUUID,servantUUID)) {
            return {error:false, message:`Item is equipped`}
        }
        return {error:true, message:`Failed to equip item...`}
    },
    unequipItem: async ({ request }) => {
        const data = await request.formData();
        const itemUUID = data.get('itemUUID');
        const servantUUID = data.get('servantUUID');
        if (await handleItemUnequipping(itemUUID,servantUUID)) {
            return {error:false, message:`Item is equipped`}
        }
        return {error:true, message:`Failed to equip item...`}
    }
}
