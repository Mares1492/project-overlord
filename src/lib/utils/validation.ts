import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const nicknameSchema = z.object({
    nickname: z.string().min(3).max(64),
})

export type userDataInput = z.infer<typeof userSchema>;

export type nicknameInput = z.infer<typeof nicknameSchema>;
