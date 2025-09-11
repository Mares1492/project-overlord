import {getKeepData} from '$lib/server/services/keeps'

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const KeepData = await getKeepData(params.uuid)
    return {keep:KeepData}
}

