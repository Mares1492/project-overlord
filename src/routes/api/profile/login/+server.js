import { loginSchema } from '$lib/utils/validation';
import { db } from '$lib/db/client';
import { users } from '$lib/db/schema';
import { json, error } from '@sveltejs/kit';
import {verifyPassword} from "$lib/server/auth.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
        return json(
            { error: 'Invalid input', issues: result.error.flatten() },
            { status: 400 }
        );
    }

    const { email, password } = result.data;

    const user = db.select().from(users).where(users.email.eq(email)).get();

    if (!user || !await verifyPassword(password, user.passwordHash)) {
        throw error(401, 'Invalid credentials');
    }

    // TODO: Set secure session cookie
    return json({ message: 'Logged in!' });
}
