import {userLoginSchema} from '$lib/utils/validation';
import { json} from '@sveltejs/kit';
import {createUserSession, login} from "$lib/server/router/user";
import {createAuthCookies} from "$lib/server/auth";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    const result = userLoginSchema.safeParse(body);

    if (!result.success) {
        return json(
            { error: 'Invalid input', issues: result.error.flatten() },
            { status: 400 }
        );
    }

    const { email, password } = result.data;
    const user = await login(email, password);
    const [accessToken,refreshToken] = await createUserSession(user);

    // TODO: Set secure session cookie
    return json(
        { message: `${user.nickname} has awaken!` },
        {
            status: 200,
            headers: {
                'Set-Cookie': createAuthCookies(accessToken, refreshToken),
                'Content-Type': 'application/json'
            }
        }
    );
}
