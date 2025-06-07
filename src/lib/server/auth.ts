import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import cookie, { serialize } from 'cookie';
import {getUserSessionByToken,getUserFromSession} from '$lib/server/router/user';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
};

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10); // 10 salt rounds
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export function signAccessToken(payload, options = {}) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m', ...options });
}

export function signRefreshToken(payload, options = {}) {
    return jwt.sign(payload, env.REFRESH_SECRET, { expiresIn: '7d', ...options });
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, env.REFRESH_SECRET);
    } catch {
        return null;
    }
}
