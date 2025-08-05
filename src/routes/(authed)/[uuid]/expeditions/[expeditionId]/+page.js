
import {getExpeditionById} from '$lib/state/expeditionState.svelte'

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const { expeditionId } = params;
    
    return {expedition:getExpeditionById(expeditionId)}
}
