import {db} from '$lib/server/db/db';
import {sessions, users} from '$lib/server/db/schema';
import {hashPassword, signAccessToken, signRefreshToken, verifyPassword} from '$lib/server/auth';
import {error} from '@sveltejs/kit';
import {randomUUID} from 'crypto';
import {generateDarkFantasyName} from "$lib/utils/nameGenerator.js";
import {eq} from "drizzle-orm";

/**
 * @param email {string}
 * @param password {string}
 */
export const createUser = async (email, password) => {
    // Check if user already exists

    const existing = await db.select().from(users).where(eq(users.email,email)).get();
    if (existing) {
        throw error(409, 'Email already registered');
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
        uuid: randomUUID(),
        email,
        passwordHash,
        nickname: generateDarkFantasyName(),
    };

    await db.insert(users).values(newUser);

    return newUser;
}

export const login = async (email, password) => {

    const user = await db.select().from(users).where(eq(users.email,email)).get();

    if (!user || !await verifyPassword(password, user.passwordHash)) {
        throw error(401, 'Invalid credentials');
    }

    return user;
}

