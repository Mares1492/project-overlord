import {db} from '$lib/server/db/db';
import {sessions, users} from '$lib/server/db/schema';
import {hashPassword, signAccessToken, signRefreshToken, verifyPassword} from '$lib/server/auth';
import {error} from '@sveltejs/kit';
import {randomUUID} from 'crypto';
import {generateDarkFantasyName} from "$lib/utils/nameGenerator.js";
import {eq} from "drizzle-orm";
import {createKeep, deleteKeep} from "$lib/server/router/keep.js";

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

    const result = await db.insert(users).values(newUser).returning();

    const createdUser =  result[0];
    console.log(createdUser);
    await createKeep(createdUser.id)

    return createdUser;
}

    const user = await db.select().from(users).where(eq(users.email,email)).get();

    if (!user || !await verifyPassword(password, user.passwordHash)) {
        throw error(401, 'Invalid credentials');
    }

    return user;
}

export const logout = async (user) => {
    await db.delete(sessions).where(eq(sessions.userId,user.id));
}

export const createUserSession = async (user) => {
    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id });
    const prevSession = await db.select().from(sessions).where(eq(sessions.userId,user.id)).get();
    if (prevSession) {
        await db.delete(sessions).where(eq(sessions.userId,user.id));
    }
    await db.insert(sessions).values({
        refreshToken: refreshToken,
        userId: user.id,
        createdAt: new Date(),
    });

    return [accessToken, refreshToken];
}

export const getUserFromSession = async (session) => {
    return db.select().from(users).where(eq(users.id, session.userId)).get();
}

export const getUserSessionByToken = async (refreshToken) => {
    return db.select().from(sessions).where(eq(sessions.refreshToken, refreshToken)).get();
}
