import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

// User Session

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

// Keep
// TODO: Add tables from model

export const keeps = pgTable('keeps', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	lvl: integer('keep_lvl').notNull().default(1),
});

export const barracks = pgTable('barracks', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	lvl: integer('barrack_lvl').notNull().default(1),
	name: text('name').notNull(),
});
});

// Items

export const itemTypes = pgTable('item_types', {
	id: integer('id').primaryKey(),
	name: text('email').notNull() 
})

export const slotTypes = pgTable('slot_types', {
	id: integer('id').primaryKey(),
	name: text('email').notNull() 
})

export const items = pgTable('items', {
	id: serial('id').primaryKey(),
	name: text("name").notNull(),
	itemTypeId: integer('item_type_id')
		.notNull()
		.references(() => itemTypes.id),
	slotTypeId: integer('slot_type_id')
	.notNull()
	.references(() => slotTypes.id),
	uuid: uuid('uuid').notNull()
})

export const itemRarityTypes = pgTable('item_rarity_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
})

export const itemRarities = pgTable('item_rarities', {
	id: integer('id').primaryKey(),
	itemId: integer('item_id')
		.notNull()
		.references(() => items.id),
	itemRarityTypeId: integer('item_rarity_type_id')
		.notNull()
		.references(() => itemRarityTypes.id),
});

export const itemAttributes = pgTable('item_attributes',{
	id: serial('id').primaryKey(),
	attributeId: integer('attribute_id')
		.notNull()
		.references(() => attributes.id),
	itemRarityId: integer('item_rarity_id')
		.notNull()
		.references(() => itemRarities.id),
})

// Servants

export const races = pgTable('races',{
	id: serial('id').primaryKey(),
	name: text('race').notNull()
})

export const servantStatuses = pgTable('servant_statuses', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
}); 

export const servants = pgTable('servants', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	raceId: integer('race_id')
		.notNull()
		.references(()=>races.id),
	name: text('name').notNull(),
	uuid: uuid('uuid').notNull(),
	status: integer('status')
		.notNull()
		.references(() => servantStatuses.id)
})

export const attributes = pgTable('attributes', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	shortName: varchar('short_name', { length: 12 }).notNull()
})

export const servantAttribute = pgTable('servant_attribute', {
	id: serial('id').primaryKey(),
	servantId: integer('servant_id')
		.notNull()
		.references(() => servants.id),
	attributeId: integer('attribute_id')
		.notNull()
		.references(() => attributes.id),
	value: integer('value').notNull()
});

export const servantItems = pgTable('servant_items', {
	id: serial('id').primaryKey(),
	servantId: integer('servant_id')
		.notNull()
		.references(() => servants.id),
	itemId: integer('item_id')
		.notNull()
		.references(() => items.id),
	slotTypeId: integer('slot_type_id')
		.notNull()
		.references(() => slotTypes.id)
});

// Events
