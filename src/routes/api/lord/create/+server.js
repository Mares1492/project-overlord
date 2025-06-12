import { userSchema } from '$lib/utils/validation';
import { json } from '@sveltejs/kit';
import {createUser} from "$lib/server/router/user";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
        return json({ error: 'Invalid input', issues: result.error.flatten() }, { status: 400 });
    }

    const { email, password } = result.data;

    const newUser = await createUser(email, password);

    return json({ user:newUser.email, status:"created" });
}
