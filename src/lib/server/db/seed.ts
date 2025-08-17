// scripts/seedConstants.ts
import "dotenv/config"; 
import { db } from "./db"; // your Drizzle instance
import { itemTypes, slotTypes, itemRarityTypes } from './schema';

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
  console.log("✅ Constants seeded successfully.");
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
