// INFO: Enums are not ALL_CAPS to use them as keys for non constant objects
// CURRENT ENUM CONVENSION FOR THIS PROJECT: lowercase, underscores as 'spaces'

/**@param {Object<string,number>} obj*/
const invertObject = (obj) => {
  /**@type {Object<number,string>} */
  const inverted = {};
  for (const [/**@type {string}*/ key, /**@type {number}*/ value] of Object.entries(obj)) {
    inverted[value] = key;
  }
  return inverted;
}

export const EquipmentSlot = {
  head: 1,
  body: 2,
  legs: 3,
  feet: 4,
  hands: 5,
  first_hand: 6,
  off_hand: 7,
  neck: 8
};

export const invertedEquipmentSlot = invertObject(EquipmentSlot)

export const ItemType = {
  helmet: 1,
  hat:2,
  armor: 3,
  legs: 4,
  feet: 5,
  hands: 6,
  weapon: 7,
  two_handed_weapon: 8,
  off_hand: 9,
  magic_off_hand:10,
  medalion: 11,
  trinket: 12,
  hood: 13,
  magic_sword:14
};

export const invertedItemType = invertObject(ItemType)

export const ItemRarity = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    mythic: 5,
    legendary: 6
};

export const invertedItemRarity = invertObject(ItemRarity)

export const LocationType = {
  ruins: 0,
  keep: 1,
  river: 2,
  neg_energy: 3,
  meadows: 4,
  wilds: 5,
  swamp: 6,
  major_settlement: 7,
  minor_settlement: 8,
  merc_camp: 9,
  pos_energy: 10
};

export const invertedLocationType = invertObject(LocationType)

export const LocationImportanceType = {
  minor: 1,
  common: 2,
  uncommon: 3,
  major: 4
}

export const ExpeditionStatus = {
  idle: 1,
  in_progress: 2,
  completed: 3,
  archived: 4,
  failed: 5,
}

export const invertedExpeditionStatus = invertObject(ExpeditionStatus)

export const ServantStatus = {
  idle: 1,
  expedition: 2,
  injured: 3,
  dead: 4,
  retired: 5,
  missing: 6
}

export const RaceTypes = {
  human: 1,
  elf: 2,
  dark_elf: 3,
  orc: 4,
  goblin: 5
}
/**@type {Object<number,string>} */
export const invertedRaceTypes = invertObject(RaceTypes)

export const AttributeTypes = {
  strength: 1,
  dexterity: 2,
  intelligence: 3,
  agility: 4,
  endurance: 5,
  healing_rate: 6,
  tactics: 7,
  stealth: 8,
  focus: 9,
  morale: 10,
  armor: 11
}
