import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(), // auto-incrementing integer
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	nickname: text('nickname').notNull(),
	uuid: uuid('uuid').notNull()
});

export const sessions = pgTable('sessions', {
	refreshToken: text('refresh_token').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp('created_at', { withTimezone: false }).defaultNow()
});

export const keeps = pgTable('keeps', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	keepLvl: integer('keep_lvl').notNull().default(1),
	barracksLvl: integer('barracks_lvl').notNull().default(1),
	treasuryLvl: integer('treasury_lvl').notNull().default(1),
	arsenalLvl: integer('arsenal_lvl').notNull().default(1),
	academyLvl: integer('academy_lvl').notNull().default(0),
	tombLvl: integer('tomb_lvl').notNull().default(0),
	gold: integer('gold').notNull().default(500),
	gems: integer('gems').notNull().default(0)
});
