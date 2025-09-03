/** @type {import('./$types').PageLoad} */
export async function load({parent,data}) {
    const parentData = await parent();
    if (!data.inventory) {
        console.error("user inventory is missing")
    }
    return {
        error: parentData.error ?? false,
        message: parentData.message ?? null,
        servants: parentData.servants ?? [],
        inventory: data.inventory ?? {
            maxSlots: 15,
            unlockedSlots: 5,
            items:[],
        }
    };
}
