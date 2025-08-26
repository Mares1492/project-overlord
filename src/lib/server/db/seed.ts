// scripts/seedConstants.ts
import "dotenv/config"; 
import { db } from "./db"; // your Drizzle instance
import { itemTypes, slotTypes, races, itemRarityTypes, expeditionStatuses,expeditionTasks,expeditionApproaches,expeditionScales, buildingBuffTypes, extensionBuildings, extensionBuildingBuffs, servantStatuses, attributes } from './schema';

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

const itemSlotTypeValues = [
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
  { id: 1, name: "idle"},
  { id: 2, name: "expedition"},
  { id: 3, name: "injured"},
  { id: 4, name: "dead"},
  { id: 5, name: "retired"},
  { id:6, name: "missing"},
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

const expeditionStatusValues = [
  { id:1, name: "idle"},
  { id:2, name: "in_progress"},
  { id:3, name: "completed"},
  { id:4, name: "archived"},
  { id:5, name: "failed"},
]

const expeditionApproachValues = [
  { id:1, name: "Stealth",tooltip:"Shadows are your cloak. Strike unseen, or slip away."},
  { id:2, name: "Action",tooltip:"Steel and blood decide this path. Meet foes head-on"},
  { id:3, name: "Situational",tooltip:"Adapt to the dark tide. Cunning or carnage - as fate demands."},
]

const expeditionTaskValues = [
  { id:1, name: "Scout",tooltip:"Chart unknown lands, uncover secrets best left buried."},
  { id:2, name: "Loot",tooltip:"Seize wealth from ruin, heedless of curses."},
  { id:3, name: "Foster Ties",tooltip:"Whisper dark promises, forge fragile alliances."},
]

const expeditionScaleValues = [
  { id:1, name: "Sprint",tooltip:"A swift foray; little risk, modest spoils."},
  { id:2, name: "Run",tooltip:"Deeper strides; danger grows, rewards beckon."},
  { id:3, name: "Marathon",tooltip:"A grueling campaign; riches and ruin walk hand in hand."},
  { id:3, name: "Odyssey",tooltip:"A legend in the making — triumph or doom writ large."}
]

async function seed() {
  await db
    .insert(itemTypes)
    .values(itemTypeValues)
    .onConflictDoNothing();

  await db
    .insert(slotTypes)
    .values(itemSlotTypeValues)
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
  
  await db
    .insert(expeditionStatuses)
    .values(expeditionStatusValues)
    .onConflictDoNothing();
  
  await db
    .insert(expeditionTasks)
    .values(expeditionTaskValues)
    .onConflictDoNothing();

  await db
    .insert(expeditionApproaches)
    .values(expeditionApproachValues)
    .onConflictDoNothing();

  await db
    .insert(expeditionScales)
    .values(expeditionScaleValues)
    .onConflictDoNothing();

  console.log("✅ Constants seeded successfully.");
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
