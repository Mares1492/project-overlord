const invertObject = (obj) => {
  const inverted = {};
  for (const [key, value] of Object.entries(obj)) {
    inverted[value] = key;
  }
  return inverted;
}

export const EquipmentSlot = {
  head: 0,
  armor: 1,
  legs: 2,
  feet: 3,
  hands: 4,
  firstHand: 5,
  offHand: 6,
  neck: 7
};

export const ItemType = {
  helmet: 1,
  hat:2,
  armor: 3,
  legs: 4,
  feet: 5,
  hands: 6,
  weapon: 7,
  twoHandedWeapon: 8,
  offHand: 9,
  magicOffHand:10,
  medalion: 11,
  trinket: 12
};


export const ItemRarity = {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4
};

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

