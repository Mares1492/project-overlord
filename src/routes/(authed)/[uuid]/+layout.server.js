import {redirect} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ cookies }) {
    if (!cookies.get('refreshToken')) {

        redirect(301, '/');
    }
    console.log("loading authed session...");
}
