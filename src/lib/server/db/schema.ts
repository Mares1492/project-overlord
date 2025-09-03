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
	uuid: uuid('uuid').notNull().defaultRandom()
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
	name: text('name').notNull() 
})

export const slotTypes = pgTable('slot_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull() 
})

export const items = pgTable('items', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	itemTypeId: integer('item_type_id')
		.notNull()
		.references(() => itemTypes.id),
	slotTypeId: integer('slot_type_id')
	.notNull()
	.references(() => slotTypes.id),
	uuid: uuid('uuid').notNull().defaultRandom(),
	iconPath: text("icon_path").notNull()
})

export const itemRarityTypes = pgTable('item_rarity_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	color_hex: varchar('color_hex', { length: 7 }).notNull().default('#FFFFFF'),
})

export const itemRarities = pgTable('item_rarities', {
	id: integer('id').primaryKey(),
	itemId: integer('item_id')
		.notNull()
		.references(() => items.id),
	itemRarityTypeId: integer('item_rarity_type_id')
		.notNull()
		.references(() => itemRarityTypes.id),
	name: text("name").notNull(),
	description: text('description').notNull().default(""),
	useOnlyPredefinedAttributes: boolean('use_only_predefined_attributes').notNull().default(false)
});

// For default attributes of item rarity
export const itemRarityAttributes = pgTable('item_rarity_attributes',{
	id: serial('id').primaryKey(),
	attributeId: integer('attribute_id') 
		.notNull()
		.references(() => attributes.id),
	itemRarityId: integer('item_rarity_id') 
		.notNull()
		.references(() => itemRarities.id),
	value: integer('value').notNull().default(1)
})

// For attributes unique to usable item
export const itemAttributes = pgTable('item_attributes',{
	id: serial('id').primaryKey(),
	attributeId: integer('attribute_id') 
		.notNull()
		.references(() => attributes.id),
	usableItemId: integer('usable_item_id') 
		.notNull()
		.references(() => usableItems.id),
	value: integer('value').notNull().default(1),
})

export const usableItems = pgTable('usable_items', {
	id: serial('id').primaryKey(),
	itemRarityId: integer('item_rarity_id')
		.notNull()
		.references(() => itemRarities.id),
})

// Servants

export const races = pgTable('races',{
	id: serial('id').primaryKey(),
	name: text('name').notNull()
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
	statusId: integer('status_id')
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
	inventoryItemId: integer('inventory_item_id') 
		.notNull()
		.references(() => inventoryItems.id),
});

// Locations
export const locationTypes = pgTable('location_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
});

export const locationImportanceTypes = pgTable('location_importance_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	value: integer('value').notNull()
});

export const locations = pgTable('locations', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	color_hex: varchar('color_hex', { length: 7 }).notNull().default('#FFFFFF'),
	coordsX: integer('coords_x').notNull().default(0),
	coordsY: integer('coords_y').notNull().default(0),
	isBase: boolean('is_base').notNull().default(false),
	locationTypeId: integer('location_type_id')
		.notNull()
		.references(() => locationTypes.id),
	importanceTypeId: integer('importance_type_id')
		.notNull()
		.references(() => locationImportanceTypes.id)
});

export const availableLocations = pgTable('available_locations', {
	id: serial('id').primaryKey(),
	locationId: integer('location_id')
		.notNull()
		.references(() => locations.id),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});

//Expeditions

export const expeditionStatuses = pgTable('expedition_statuses', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});

export const expeditionApproaches = pgTable('expedition_approaches', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	tooltip: text('tooltip').notNull()
});

export const expeditionScales = pgTable('expedition_scales', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	tooltip: text('tooltip').notNull()
});

export const expeditionTasks = pgTable('expedition_tasks', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	tooltip: text('tooltip').notNull()
});

export const expeditions = pgTable('expeditions', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid').notNull().defaultRandom(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	locationId: integer('location_id')
		.notNull()
		.references(()=> locations.id),
	servantId: integer('servant_id')
		.notNull()
		.references(() => servants.id),
	statusId: integer('status_id')
		.notNull()
		.references(() => expeditionStatuses.id)
		.default(2),
	startTime: timestamp('start_time', { withTimezone: false }).defaultNow(),
	endTime: timestamp('end_time', { withTimezone: false }),
	overviewText: text('overview_text').notNull(),
	taskId: integer('task_id')
		.notNull()
		.references(() => expeditionTasks.id),
	scaleId: integer('scale_id')
		.notNull()
		.references(() => expeditionScales.id),
	approachId: integer('approach_id')
		.notNull()
		.references(() => expeditionApproaches.id)
});

export const expeditionLoots = pgTable('expedition_loots',{
	id: serial('id').primaryKey(),
	expeditionId: integer('expedition_id')
		.notNull()
		.references(() => expeditions.id)
		.unique(),
	gold: integer('gold').notNull().default(0),
	gems: integer('gems').notNull().default(0),
});

export const expeditionLootItems = pgTable('expedition_loot_items',{
	id: serial('id').primaryKey(),
	usableItemId: integer('usable_item_id')
		.notNull()
		.references(() => usableItems.id),
	expeditionLootId: integer('expedition_id')
		.notNull()
		.references(() => expeditionLoots.id)
});

// User Inventory

export const userInventories = pgTable('user_inventories', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	availableSlots: integer('available_slots').default(8),
	maxSlots :integer('max_slots').default(15)
})

export const inventoryItems = pgTable('inventory_items', {
	id: serial('id').primaryKey(),
	userInventoryId: integer('user_inventory_id')
		.notNull()
		.references(() => userInventories.id),
	usableItemId: integer('usable_item_id')
		.notNull()
		.references(() => usableItems.id),
})

// Events
