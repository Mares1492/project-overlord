
/** @satisfies {import('./$types').Actions} */
export const actions = {
    equipItem: async ({ request }) => {
        const data = await request.formData();
        const itemId = data.get('itemId');
    }
}
