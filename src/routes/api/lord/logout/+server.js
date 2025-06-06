import {logout} from "$lib/server/router/user";
import {authUserSession, clearAuthCookies} from "$lib/server/auth";
import {error, json} from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST(request) {

    const {user,message} = await authUserSession(request);
    if (!user) return error(401, message);

    await logout(user)
    return json(
        {message: `${user.nickname} is resting now!`},
        {
            status: 200,
            headers: {
                'Set-Cookie': clearAuthCookies(),
                'Content-Type': 'application/json'
            }
        }
    );

}
