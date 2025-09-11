// scripts/seedConstants.ts
import "dotenv/config"; 
import { db } from "./db"; // your Drizzle instance
import { itemTypes, slotTypes, items, keepLevels,barracksLevels,arsenalsLevels,academyLevels,treasuryLevels,tombLevels ,races, itemRarities, itemRarityTypes, locations, expeditionStatuses,expeditionTasks,expeditionApproaches,expeditionScales, buildingBuffTypes, extensionBuildings, extensionBuildingBuffs, servantStatuses, attributes, locationTypes, locationImportanceTypes } from './schema';
import {locationValues} from './seed_data/locations'
import {itemValues,itemTypeValues,itemSlotTypeValues,itemRarityTypeValues,itemRarityValues} from './seed_data/items'
import {LocationType,RaceTypes,AttributeTypes,ExpeditionStatus,ServantStatus,LocationImportanceType} from '../../enums/enums'
import { keepLvlValues,barracksLvlValues,arsenalLvlValues,academyLvlValues,treasuryLvlValues,tombLvlValues} from "./seed_data/keepBuildings";
import { sql } from "drizzle-orm";

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
  { id: RaceTypes.human, name: "human" },
  { id:  RaceTypes.elf, name: "elf" },
  { id:  RaceTypes.dark_elf, name: "dark elf" }, 
  { id:  RaceTypes.orc, name: "orc" },
  { id:  RaceTypes.goblin, name: "goblin" }
]

const servantStatusValues = [
  { id: ServantStatus.idle, name: "idle"},
  { id: ServantStatus.expedition, name: "expedition"},
  { id: ServantStatus.injured, name: "injured"},
  { id: ServantStatus.dead, name: "dead"},
  { id: ServantStatus.retired, name: "retired"},
  { id:ServantStatus.missing, name: "missing"},
];

const attributeValues = [
  { id: AttributeTypes.strength, name: "strength", shortName: "str"},
  { id: AttributeTypes.dexterity, name: "dexterity", shortName: "dex"},
  { id: AttributeTypes.intelligence, name: "intelligence", shortName: "int"},
  { id: AttributeTypes.agility, name: "agility", shortName: "agi"},
  { id: AttributeTypes.endurance, name: "endurance", shortName: "end"},
  { id: AttributeTypes.healing_rate, name: "healing rate", shortName: "heal"},
  { id: AttributeTypes.tactics, name: "tactics", shortName: "tactics"},
  { id: AttributeTypes.stealth, name: "stealth", shortName: "stealth"},
  { id: AttributeTypes.focus, name: "focus", shortName: "focus"},
  { id: AttributeTypes.morale, name: "morale", shortName: "morale"},
  { id: AttributeTypes.armor, name: "armor", shortName: "armor"}
];

const expeditionStatusValues = [
  { id:ExpeditionStatus.idle, name: "idle"},
  { id:ExpeditionStatus.in_progress, name: "in_progress"},
  { id:ExpeditionStatus.completed, name: "completed"},
  { id:ExpeditionStatus.archived, name: "archived"},
  { id:ExpeditionStatus.failed, name: "failed"},
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
  { id: LocationImportanceType.minor, value: 4, name: "minor" },
  { id: LocationImportanceType.common, value: 5, name: "common" },
  { id: LocationImportanceType.uncommon, value: 6, name: "uncommon" },
  { id: LocationImportanceType.major, value: 7, name: "major" }
]

async function seed() {
  await db.transaction(async (tx) => {

    console.log("Inserting itemTypes")
    await tx
      .insert(itemTypes)
      .values(itemTypeValues)
      .onConflictDoUpdate({
        target: itemTypes.id,
        set: {
          name: sql`excluded.name`,
        }
      });
    
    console.log("Inserting slotTypes")
    await tx
      .insert(slotTypes)
      .values(itemSlotTypeValues)
      .onConflictDoUpdate({
        target: slotTypes.id,
        set: {
          name: sql`excluded.name`,
        }
      });
    
    console.log("Inserting itemRarityTypes")
    await tx
      .insert(itemRarityTypes)
      .values(itemRarityTypeValues)
      .onConflictDoUpdate({
        target: itemRarityTypes.id,
        set: {
          name: sql`excluded.name`,
          color_hex: sql`excluded.color_hex`
        }
      });

    console.log("Inserting items")
    await tx
      .insert(items)
      .values(itemValues)
      .onConflictDoUpdate({
        target: items.id,
        set: {
          name: sql`excluded.name`,
          itemTypeId: sql`excluded.item_type_id`,
          slotTypeId: sql`excluded.slot_type_id`,
          iconPath: sql`excluded.icon_path`
        }
      });

    console.log("Inserting itemRarities")
    await tx
      .insert(itemRarities)
      .values(itemRarityValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          name: sql`excluded.name`,
          itemId: sql`excluded.item_id`,
          itemRarityTypeId: sql`excluded.item_rarity_type_id`,
          description: sql`excluded.description`,
          useOnlyPredefinedAttributes:  sql`excluded.use_only_predefined_attributes`
        }
      });
    
    console.log("Inserting Building lvl's")
    await tx
      .insert(keepLevels)
      .values(keepLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });

    await tx
      .insert(barracksLevels)
      .values(barracksLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });

    await tx
      .insert(academyLevels)
      .values(academyLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });

    await tx
      .insert(arsenalsLevels)
      .values(arsenalLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });

    await tx
      .insert(tombLevels)
      .values(tombLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });
    
    await tx
      .insert(treasuryLevels)
      .values(treasuryLvlValues)
      .onConflictDoUpdate({
        target: itemRarities.id,
        set: {
          upgradePrice: sql`excluded.upgrade_price`,
        }
      });

    console.log("Inserting buildingBuffTypes")
    await tx
      .insert(buildingBuffTypes)
      .values(buildingBuffTypeValues)
      .onConflictDoUpdate({
        target: buildingBuffTypes.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`
        }
      });
    
    console.log("Inserting extensionBuildings")
    await tx
      .insert(extensionBuildings)
      .values(extensionBuildingValues)
      .onConflictDoUpdate({
        target: extensionBuildings.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`
        }
      });
    
    console.log("Inserting extensionBuildingBuffs")
    await tx
      .insert(extensionBuildingBuffs)
      .values(extentionBuildingBuffValues)
      .onConflictDoUpdate({
        target: extensionBuildingBuffs.id,
        set: {
          extensionBuildingId: sql`excluded.extension_building_id`,
          buffTypeId: sql`excluded.buff_type_id`,
          value: sql`excluded.value`,
          requiredLvl: sql`excluded.required_lvl`,
        }
      });

    console.log("Inserting servantStatuses")
    await tx
      .insert(servantStatuses)
      .values(servantStatusValues)
      .onConflictDoUpdate({
        target: servantStatuses.id,
        set: {
          name: sql`excluded.name`,
        }
      });
    
    console.log("Inserting races")
    await tx
      .insert(races)
      .values(raceValues)
      .onConflictDoUpdate({
        target: races.id,
        set: {
          name: sql`excluded.name`,
        }
      });

    console.log("Inserting attributes")
    await tx
      .insert(attributes)
      .values(attributeValues)
      .onConflictDoUpdate({
        target: attributes.id,
        set: {
          name: sql`excluded.name`,
        }
      });
    
    console.log("Inserting expeditionStatuses")
    await tx
      .insert(expeditionStatuses)
      .values(expeditionStatusValues)
      .onConflictDoUpdate({
        target: expeditionStatuses.id,
        set: {
          name: sql`excluded.name`,
        }
      });
      
    console.log("Inserting expeditionTasks")
    await tx
      .insert(expeditionTasks)
      .values(expeditionTaskValues)
      .onConflictDoUpdate({
        target: expeditionTasks.id,
        set: {
          name: sql`excluded.name`,
          tooltip: sql`excluded.tooltip`
        }
      });
    
    console.log("Inserting expeditionApproaches")
    await tx
      .insert(expeditionApproaches)
      .values(expeditionApproachValues)
      .onConflictDoUpdate({
        target: expeditionApproaches.id,
        set: {
          name: sql`excluded.name`,
          tooltip: sql`excluded.tooltip`
        }
      });

    console.log("Inserting expeditionScales")
    await tx
      .insert(expeditionScales)
      .values(expeditionScaleValues)
      .onConflictDoUpdate({
        target: expeditionScales.id,
        set: {
          name: sql`excluded.name`,
          tooltip: sql`excluded.tooltip`
        }
      });

    console.log("Inserting locationTypes")
    await tx
      .insert(locationTypes)
      .values(locationTypeValues)
      .onConflictDoUpdate({
        target: locationTypes.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`
        }
      });

    console.log("Inserting locationImportanceTypes")
    await tx
      .insert(locationImportanceTypes)
      .values(locationImportanceTypeValues)
      .onConflictDoUpdate({
        target: locationImportanceTypes.id,
        set: {
          name: sql`excluded.name`,
          value: sql`excluded.value`
        }
      });

    console.log("Inserting locations")
    await tx
      .insert(locations)
      .values(locationValues)
      .onConflictDoUpdate({
        target: locations.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`,
          color_hex: sql`excluded.color_hex`,
          coordsX: sql`excluded.coords_x`,
          coordsY: sql`excluded.coords_y`,
          isBase: sql`excluded.is_base`,
          locationTypeId: sql`excluded.location_type_id`,
          importanceTypeId: sql`excluded.importance_type_id`
        }
      });
  })

  console.log("✅ Constants seeded successfully.");
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
