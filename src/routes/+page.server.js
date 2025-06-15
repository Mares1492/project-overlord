import {error, fail, json, redirect} from '@sveltejs/kit';
import {createUser, createUserSession, login} from "$lib/server/router/user.js";
import {userCreateSchema,userLoginSchema} from "$lib/utils/validation.js";
import {authUserSession, createAuthCookies} from "$lib/server/auth.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, request }) {
    if (!cookies.get('accessToken')){
        return {user: null, status: 'not signed in'};
    }
    const {user} = await authUserSession(request)
    throw redirect(301, `/keep`);
}
/** @satisfies {import('./$types').Actions} */
