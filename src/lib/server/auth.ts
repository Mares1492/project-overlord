import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import cookie, { serialize } from 'cookie';
import {getUserSessionByToken,getUserFromSession} from '$lib/server/router/user';

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10); // 10 salt rounds
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
