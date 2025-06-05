// src/routes/api/register/+server.ts
import { db } from '$lib/db/client';
import { users } from '$lib/db/schema';
import { registerSchema } from '$lib/schemas/auth';
import { hashPassword } from '$lib/auth/password';
import { json, error } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import {generateDarkFantasyName} from "$lib/utils/nameGenerator.js";

export async function POST({ request }) {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
        return json({ error: 'Invalid input', issues: result.error.flatten() }, { status: 400 });
    }

    const { email, password } = result.data;

    // Check if user already exists
    const existing = db.select().from(users).where(users.email.eq(email)).get();
    if (existing) {
        throw error(409, 'Email already registered');
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
        id: randomUUID(),
        email,
        passwordHash,
        nickname: generateDarkFantasyName(),
    };

    await db.insert(users).values(newUser);

    return json({ success: true, user: { id: newUser.id, email: newUser.email } });
}
