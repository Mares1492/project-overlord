
import {getExpeditionById} from '$lib/state/expeditionState.svelte'
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const { uuid,expeditionId } = params;
    /*
        Only works when using goto to redirect from app
        TODO: get expeditions from db
    */
    const expedition = getExpeditionById(expeditionId)
    if (!expedition) {
        redirect(308,`/${uuid}/expeditions`)
    }
    return {expedition}
}
