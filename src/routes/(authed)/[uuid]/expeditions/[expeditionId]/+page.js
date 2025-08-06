
import {getExpeditionById} from '$lib/state/expeditionState.svelte'
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({data,params}) {
    const { uuid,expeditionId } = params;
    /*
        Only works when using goto to redirect from app
        TODO: get expeditions from db using server file
    */
    const expedition = getExpeditionById(expeditionId)
    if (!expedition) {
        redirect(308,`/${uuid}/expeditions`)
    }
    expedition.events = data.events
    return {expedition}
}
