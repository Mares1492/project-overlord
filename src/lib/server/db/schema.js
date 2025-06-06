import { sqliteTable, integer,text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
	id: integer("id",{mode: 'number' }).primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	nickname: text('nickname').notNull(),
	uuid: text('uuid').notNull(),
});

export const sessions = sqliteTable('sessions', {
	refreshToken: text('refreshToken').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' })
});
