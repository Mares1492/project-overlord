// scripts/seedConstants.ts
import "dotenv/config"; 
import { db } from "./db"; // your Drizzle instance
import { itemTypes, slotTypes, races, itemRarityTypes, buildingBuffTypes, extensionBuildings, extensionBuildingBuffs, servantStatuses, attributes } from './schema';

const itemTypeValues = [
  { id:1, name: "helmet" },
  { id:2, name: "hat" },
  { id:3, name: "armor" },
  { id:4, name: "legs" },
  { id:5, name: "feet" },
  { id:6, name: "hands" },
  { id:7, name: "weapon" },
  { id:8, name: "two handed weapon" },
  { id:9, name: "off-hand" },
  { id:10, name: "magic off-hand" },
  { id:11, name: "medalion" },
  { id:12, name: "trinket" }
]

const itemSlotValues = [
  { id:1, name: "head" },
  { id:2, name: "neck" },
  { id:3, name: "chest" },
  { id:4, name: "legs" },
  { id:5, name: "feet" },
  { id:6, name: "hands" },
  { id:7, name: "main hand" },
  { id:8, name: "off hand" },
]

const itemRarityTypeValues = [
  { id:1, name: "common" },
  { id:2, name: "uncommon" },
  { id:3, name: "rare" },
  { id:4, name: "mythic" },
  { id:5, name: "legendary" },
]

const buildingBuffTypeValues = [
  { id:1, name: "barracks capacity", description: "Increases the maximum number of servants you can have." },
]

const extensionBuildingValues = [
  { id:1, name: "beds", description: "Increases the number of servants you can have in your barracks." },
  { id:2, name: "training yard", description: "Increases strength of your servants" },
  { id:3, name: "archery range", description: "Increases dexterity of your servants." },
  { id:4, name: "meditation room", description: "Increases focus of your servants." },
  { id:5, name: "dining hall", description: "Increases morale of your servants." },
  { id:6, name: "sparring hall", description: "Increases endurance of your servants." },
  { id:7, name: "infirmary nook", description: "Increases healing rate of your servants." },
  { id:8, name: "war room", description: "Increases tactics of your servants." },
  { id:9, name: "night training ground", description: "Increases stealth ability of your servants." },
  { id:10, name: "library", description: "Increases intelligence of your servants." },
  { id:11, name: "blacksmith's annex", description: "Increases the quality of weapons and armor your servants can use." },
  { id:12, name: "warcasters's tower", description: "Increases the power of spells your servants can cast." },
]

const extentionBuildingBuffValues = [
  {id:1, extensionBuildingId: 1, buffTypeId: 1, value: 3, requiredLvl: 1},
  {id:2, extensionBuildingId: 1, buffTypeId: 1, value: 6, requiredLvl: 2},
  {id:3, extensionBuildingId: 1, buffTypeId: 1, value: 12, requiredLvl: 3},
  {id:4, extensionBuildingId: 1, buffTypeId: 1, value: 20, requiredLvl: 4},
  {id:5, extensionBuildingId: 1, buffTypeId: 1, value: 30, requiredLvl: 5},
];

const raceValues = [
  { id: 1, name: "human" },
  { id: 2, name: "elf" },
  { id: 3, name: "dark elf" }, 
  { id: 4, name: "orc" },
  { id: 5, name: "goblin" },
]

const servantStatusValues = [
  { id: 1, name: "alive"},
  { id: 2, name: "injured"},
  { id: 3, name: "dead"},
  { id: 4, name: "retired"},
  { id:5, name: "missing"}
];

const attributeValues = [
  { id: 1, name: "strength", shortName: "str"},
  { id: 2, name: "dexterity", shortName: "dex"},
  { id: 3, name: "intelligence", shortName: "int"},
  { id: 4, name: "agility", shortName: "agi"},
  { id: 5, name: "endurance", shortName: "end"},
  { id: 6, name: "healing rate", shortName: "hr"},
  { id: 7, name: "tactics", shortName: "tactics"},
  { id: 8, name: "stealth", shortName: "stealth"},
  { id: 9, name: "focus", shortName: "focus"},
  { id: 10, name: "morale", shortName: "morale"},
];

async function seed() {
  await db
    .insert(itemTypes)
    .values(itemTypeValues)
    .onConflictDoNothing();

  await db
    .insert(slotTypes)
    .values(itemSlotValues)
    .onConflictDoNothing();
  
  await db
    .insert(itemRarityTypes)
    .values(itemRarityTypeValues)
    .onConflictDoNothing();

  await db
    .insert(buildingBuffTypes)
    .values(buildingBuffTypeValues)
    .onConflictDoNothing();
  
  await db
    .insert(extensionBuildings)
    .values(extensionBuildingValues)
    .onConflictDoNothing();
 
  await db
    .insert(extensionBuildingBuffs)
    .values(extentionBuildingBuffValues)
    .onConflictDoNothing();

  await db
    .insert(servantStatuses)
    .values(servantStatusValues)
    .onConflictDoNothing();
    
  await db
    .insert(races)
    .values(raceValues)
    .onConflictDoNothing();

  await db
    .insert(attributes)
    .values(attributeValues)
    .onConflictDoNothing();

  console.log("✅ Constants seeded successfully.");
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
