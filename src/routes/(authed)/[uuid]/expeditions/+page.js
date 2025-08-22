export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({parent}) {
    const { servants } = await parent();
    return {servants}
}
