import {redirect} from '@sveltejs/kit';
import {authUserSession} from "$lib/server/auth.js";
import locations from "$lib/testData/locations.json";

/** @type {import('./$types').PageLoad} */
export async function load({cookies}) {
    const {user, message} = await authUserSession(cookies)

    if (!user) {
        redirect(307, `/`);
    }
    console.log("loading authed session...");
    return {pathUUID: user.uuid,locations}
}
