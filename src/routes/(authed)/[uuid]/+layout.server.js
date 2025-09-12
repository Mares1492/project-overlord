import {redirect} from '@sveltejs/kit';
import {authUserSession} from "$lib/server/auth.js";
import {getServantsByUserUUID} from '$lib/server/services/servants.js';
import {getTreasuryData} from '$lib/server/services/treasuries'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies,params}) {
    const {user} = await authUserSession(cookies)
    if (!user) {
        redirect(308, `/`);
    }
    if (params.uuid !== user.uuid) {
        console.log("path uuid is altered redirecting...");
        redirect(308, `/${user.uuid}/keep`);
    }
    const {servants,availableServants} = await getServantsByUserUUID(user.uuid)
    const treasuryData = await getTreasuryData(user.id)
    if (!servants) {
        return {pathUUID: user.uuid, error: true, message: "No servants found for this user", availableServants, treasuryData};
    }
    console.log("loading authed session...");
    return {pathUUID: user.uuid, servants, availableServants, treasuryData}
}
