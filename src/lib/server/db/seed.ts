// scripts/seedConstants.ts
import { db } from "./db"; // your Drizzle instance

const itemTypes = [
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
  { id:12, name: "trinket" },
];

async function seed() {
  for (const itemType of itemTypes) {
    await db
      .insert(db.itemTypes)
      .values(itemType)
      .onConflictDoNothing(); // safe for repeated runs
  }
  console.log("Constants seeded successfully.");
}

seed();
