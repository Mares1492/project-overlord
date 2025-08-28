

/** @type {import('./$types').PageLoad} */
export async function load({data}) {
    return {expedition:data.expedition}
}
