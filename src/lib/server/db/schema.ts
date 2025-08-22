import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	uuid,
	varchar,
	boolean
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
	lvl: integer('lvl').notNull().default(1)
});

// Keep - barracks
export const barracks = pgTable('barracks', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	lvl: integer('lvl').notNull().default(1),
	name: text('name').notNull()
});

export const extensionBuildings = pgTable('extension_buildings', {
	id: integer('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description').notNull()
});

export const extensionUpgradeCosts = pgTable('extension_upgrade_costs', {
	id: integer('id').primaryKey(),
	extensionBuildingId: integer('extension_building_id')
		.notNull()
		.references(() => extensionBuildings.id),
	cost: integer('cost').notNull(),
	lvl: integer('lvl').notNull().default(1)
});

export const buildingBuffTypes = pgTable('building_buff_types', {
	id: integer('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description').notNull()
});

export const extensionBuildingBuffs = pgTable('extension_building_buffs', {
	id: serial('id').primaryKey(),
	extensionBuildingId: integer('extension_building_id')
		.notNull()
		.references(() => extensionBuildings.id),
	buffTypeId: integer('buff_type_id')
		.notNull()
		.references(() => buildingBuffTypes.id),
	value: integer('value').notNull(),
	requiredLvl: integer('required_lvl').notNull().default(1)
});

export const barracksExtensionBuildings = pgTable('barracks_extension_buildings', {
	id: serial('id').primaryKey(),
	barracksId: integer('barracks_id')
		.notNull()
		.references(() => barracks.id),
	extensionBuildingId: integer('extension_building_id')
		.notNull()
		.references(() => extensionBuildings.id),
	lvl: integer('lvl').notNull().default(1)
});

// Keep - treasury

export const treasuries = pgTable('treasuries', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	name: text('name').notNull(),
	gold: integer('gold').notNull().default(0),
	gems: integer('gems').notNull().default(0),
	lvl: integer('lvl').notNull().default(1)
});

// Keep - academy

export const academies = pgTable('academies', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	name: text('name').notNull(),
	lvl: integer('lvl').notNull().default(1)
});

// Keep - tomb

export const tombs = pgTable('tombs', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	name: text('name').notNull(),
	lvl: integer('lvl').notNull().default(1)
});

// Keep - arsenal

export const arsenals = pgTable('arsenals', {
	id: serial('id').primaryKey(),
	keepId: integer('keep_id')
		.notNull()
		.references(() => keeps.id),
	name: text('name').notNull(),
	lvl: integer('lvl').notNull().default(1)
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
	uuid: uuid('uuid').notNull().defaultRandom(),
	status: integer('status')
		.notNull()
		.references(() => servantStatuses.id).default(1),
	vampire: boolean('vampire').notNull().default(false),
})

export const attributes = pgTable('attributes', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	shortName: varchar('short_name', { length: 12 }).notNull()
})

export const servantAttributes = pgTable('servant_attributes', {
	id: serial('id').primaryKey(),
	servantId: integer('servant_id')
		.notNull()
		.references(() => servants.id),
	attributeId: integer('attribute_id')
		.notNull()
		.references(() => attributes.id),
	value: integer('value').notNull().default(1),
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

// Locations
export const locationTypes = pgTable('location_types', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});

export const locationImpotanceTypes = pgTable('location_importance_types', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});

// Events
