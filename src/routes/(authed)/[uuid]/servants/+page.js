/*
    TODO: 
    This is a temporary solution to load inventory data from a JSON file. 
    In the future, this should be replaced with a proper API
*/
import inventoryData  from '$lib/test_data/inventory.json';

/** @type {import('./$types').PageLoad} */
export async function load({parent}) {
    const data = await parent();
    return {
        error: data.error ?? false,
        message: data.message ?? null,
        servants: data.servants ?? [],
        inventory: {
            maxSlots: 30,
            unlockedSlots: 25,
            items: inventoryData,
        }
    };
}
