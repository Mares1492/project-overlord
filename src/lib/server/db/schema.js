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

export const keeps =  sqliteTable('keeps', {
	id: integer("id",{mode: 'number' }).primaryKey({ autoIncrement: true }),
	userId: text('user_id').notNull().references(() => users.id),
	keepLvl: integer("keep_lvl", { mode: 'number' }).notNull().default(1),
	barracksLvl: integer("barracks_lvl", { mode: 'number' }).notNull().default(1),
	treasuryLvl: integer("treasury_lvl", { mode: 'number' }).notNull().default(1),
	arsenalLvl: integer("arsenal_lvl", { mode: 'number' }).notNull().default(1),
	academyLvl: integer("academy_lvl", { mode: 'number' }).notNull().default(0),
	tombLvl: integer("tomb_lvl", { mode: 'number' }).notNull().default(0),
	gold: integer("gold", { mode: 'number' }).notNull().default(500),
	gems: integer("gems", { mode: 'number' }).notNull().default(0)
})
