// scripts/seedConstants.ts
import "dotenv/config"; 
import { db } from "./db"; // your Drizzle instance
import { itemTypes, slotTypes, races, itemRarityTypes, locations, expeditionStatuses,expeditionTasks,expeditionApproaches,expeditionScales, buildingBuffTypes, extensionBuildings, extensionBuildingBuffs, servantStatuses, attributes, locationTypes, locationImportanceTypes } from './schema';
import {locationValues} from './seed_data/locations'
import {LocationType,ExpeditionStatus,ServantStatus} from '../../enums/enums'

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
  { id: ServantStatus.IDLE, name: "idle"},
  { id: ServantStatus.EXPEDITION, name: "expedition"},
  { id: ServantStatus.INJURED, name: "injured"},
  { id: ServantStatus.DEAD, name: "dead"},
  { id: ServantStatus.RETIRED, name: "retired"},
  { id:ServantStatus.MISSING, name: "missing"},
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
  { id:ExpeditionStatus.IDLE, name: "idle"},
  { id:ExpeditionStatus.IN_PROGRESS, name: "in_progress"},
  { id:ExpeditionStatus.COMPLETED, name: "completed"},
  { id:ExpeditionStatus.ARCHIVED, name: "archived"},
  { id:ExpeditionStatus.FAILED, name: "failed"},
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
  { id:4, name: "Odyssey",tooltip:"A legend in the making — triumph or doom writ large."}
]

const locationTypeValues = [
  { id: LocationType.ruins, name: "ruins", description: "Old place with dark energy" },
  { id: LocationType.keep, name: "keep", description: "Fortified structure, once strong" },
  { id: LocationType.river, name: "river", description: "Flowing water, vital to settlements" },
  { id: LocationType.neg_energy, name: "neg_energy", description: "A cursed land, radiating malevolence" },
  { id: LocationType.meadows, name: "meadows", description: "Open grassy fields, calm and fertile" },
  { id: LocationType.wilds, name: "wilds", description: "Untamed wilderness, full of danger" },
  { id: LocationType.swamp, name: "swamp", description: "Murky wetlands, difficult to traverse" },
  { id: LocationType.major_settlement, name: "major_settlement", description: "Large hub of civilization" },
  { id: LocationType.minor_settlement, name: "minor_settlement", description: "Small village or hamlet" },
  { id: LocationType.merc_camp, name: "merc_camp", description: "Temporary camp of mercenaries" },
  { id: LocationType.pos_energy, name: "pos_energy", description: "A place of light and healing" },
];

const locationImportanceTypeValues = [
  { id: 1, value: 4, name: "minor" },
  { id: 2, value: 5, name: "common" },
  { id: 3, value: 6, name: "uncommon" },
  { id: 4, value: 7, name: "major" }
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

  await db
    .insert(locationTypes)
    .values(locationTypeValues)
    .onConflictDoNothing();

  await db
      .insert(locationImportanceTypes)
      .values(locationImportanceTypeValues)
      .onConflictDoNothing();

  await db
      .insert(locations)
      .values(locationValues)
      .onConflictDoNothing();

  console.log("✅ Constants seeded successfully.");
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
