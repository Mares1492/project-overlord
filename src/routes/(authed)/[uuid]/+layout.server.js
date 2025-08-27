import {redirect} from '@sveltejs/kit';
import {authUserSession} from "$lib/server/auth.js";
import {getServantsByUserUUID} from '$lib/server/router/servants.js';    

/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
    const {user} = await authUserSession(cookies)
    if (!user) {
        redirect(307, `/`);
    }
    const servants = await getServantsByUserUUID(user.uuid)
    if (!servants) {
        return {pathUUID: user.uuid, error: true, message: "No servants found for this user"};
    }
    console.log("loading authed session...");
    return {pathUUID: user.uuid, servants}
}
