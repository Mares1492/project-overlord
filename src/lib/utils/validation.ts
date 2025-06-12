import { z } from 'zod';

export const userCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const nicknameSchema = z.object({
    nickname: z.string().min(3).max(64),
})

export type createUserInput = z.infer<typeof userCreateSchema>;

export type loginUserInput = z.infer<typeof userLoginSchema>;

export type nicknameInput = z.infer<typeof nicknameSchema>;
