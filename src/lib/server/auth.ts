import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import cookie, { serialize } from 'cookie';
import {getUserSessionByToken,getUserFromSession} from '$lib/server/router/user';

const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
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

export function createAuthCookies(accessToken, refreshToken,isSerializeResult = true) {
    if (isSerializeResult) {
        return [
            serialize('accessToken', accessToken, {...cookieOptions, maxAge: 60 * 15}), // 15m
            serialize('refreshToken', refreshToken, {...cookieOptions, maxAge: 60 * 60 * 24 * 7}) // 7d
        ];
    }
    return [
        {name:'accessToken',token:accessToken,params:{...cookieOptions, maxAge: 60 * 15}},
        {name:'refreshToken',token:refreshToken,params:{...cookieOptions, maxAge: 60 * 60 * 24 * 7}}
    ];
}

export function clearAuthCookies(isSerializeResult = true) {

    if (isSerializeResult) {
        return [
            serialize('accessToken', '', { ...cookieOptions, maxAge: 0 }),
            serialize('refreshToken', '', { ...cookieOptions, maxAge: 0 })
        ];
    }
    return [
        {name:'accessToken',token:'',params:{ ...cookieOptions, maxAge: 0 }},
        {name:'refreshToken',token:'',params:{ ...cookieOptions, maxAge: 0 }}
    ];
}

export async function authUserSession(cookies) {
    let accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
        return {user:null, message:"Credentials verification failed"};
    }
    const session = await getUserSessionByToken(refreshToken)
    if (!session) {
        return {user:null, message:"Session is not found"};
    }
    if (!accessToken) {
        const refreshPayload = verifyRefreshToken(refreshToken);
        if (!refreshPayload) {
            return {user:null, message:"Credentials verification failed"};
        }
    }

    const user = await getUserFromSession(session);
    if (!user) {
        return {user:null, message:"User is not found"};
    }

    accessToken = signAccessToken({ id: user.id, email: user.email });
    const payload = verifyAccessToken(accessToken);
    if (!payload) {
        return {user:null, message:"Credentials verification failed"};
    }
    return {user:user, message:"OK"};
}

