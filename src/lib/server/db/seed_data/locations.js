import {LocationType,LocationImportanceType} from '../../../enums/enums'

export const locationValues = [
  {
    id: 1,
    name: "Silverpine Grove",
    importanceTypeId: LocationImportanceType.common,
    description: "A quiet forest retreat near the old ruins.",
    coordsX: 1950,
    coordsY: 1680,
    color_hex: "#d1fae5",
    locationTypeId: LocationType.ruins,
    is_base: false
  },
  {
    id: 2,
    name: "Cragstone Outpost",
    importanceTypeId: LocationImportanceType.major,
    description: "A fortified checkpoint along the trade route.",
    coordsX: 2375,
    coordsY: 2360,
    color_hex: "#a16207",
    locationTypeId: LocationType.keep,
    is_base: false
  },
  {
    id: 3,
    name: "Whitemoor Basin",
    importanceTypeId: LocationImportanceType.common,
    description: "Floodplain with rare flora and deep marshes.",
    coordsX: 4400,
    coordsY: 2700,
    color_hex: "#0ea5e9",
    locationTypeId: LocationType.river,
    is_base: false
  },
  {
    id: 4,
    name: "Duskford Crossing",
    importanceTypeId: LocationImportanceType.common,
    description: "Historic river crossing with old stone bridge and a keep guarding it.",
    coordsX: 3760,
    coordsY: 3380,
    color_hex: "#581c87",
    locationTypeId: LocationType.keep,
    is_base: false
  },
  {
    id: 5,
    name: "Emberfall Crater",
    importanceTypeId: LocationImportanceType.common,
    description: "Volcanic site now dormant but still majestic.",
    coordsX: 4460,
    coordsY: 1120,
    color_hex: "#dc2626",
    locationTypeId: LocationType.neg_energy,
    is_base: false
  },
  {
    id: 6,
    name: "Thornwatch Keep",
    importanceTypeId: LocationImportanceType.common,
    description: "Ancient fortress hidden among high cliffs.",
    coordsX: 815,
    coordsY: 1620,
    color_hex: "#334155",
    locationTypeId: LocationType.keep,
    is_base: false
  },
  {
    id: 7,
    name: "Frostwillow Meadow",
    importanceTypeId: LocationImportanceType.minor,
    description: "Chilly meadow that glows in winter dusk.",
    coordsX: 3030,
    coordsY: 550,
    color_hex: "#a5f3fc",
    locationTypeId: LocationType.meadows,
    is_base: false
  },
  {
    id: 8,
    name: "Stonebarrow Hollow",
    importanceTypeId: LocationImportanceType.common,
    description: "Ancient burial ground with eerie carvings.",
    coordsX: 3250,
    coordsY: 2665,
    color_hex: "#7f1d1d",
    locationTypeId: LocationType.neg_energy,
    is_base: false
  },
  {
    id: 9,
    name: "Glimmereach Summit",
    importanceTypeId: LocationImportanceType.uncommon,
    description: "The highest peak with stunning sunrises.",
    coordsX: 1330,
    coordsY: 3630,
    color_hex: "#c084fc",
    locationTypeId: LocationType.wilds,
    is_base: false
  },
  {
    id: 10,
    name: "Mirefen Deltas",
    importanceTypeId: LocationImportanceType.common,
    description: "Swamplands rich with life and mystery.",
    coordsX: 4130,
    coordsY: 2010,
    color_hex: "#16a34a",
    locationTypeId: LocationType.swamp,
    is_base: false
  },
  {
    id: 11,
    name: "Hollowfen Marsh",
    importanceTypeId: LocationImportanceType.common,
    description: "A misty swamp teeming with hidden dangers.",
    coordsX: 1030,
    coordsY: 3530,
    color_hex: "#6EE7B7",
    locationTypeId: LocationType.swamp,
    is_base: false
  },
  {
    id: 12,
    name: "Hollowfen",
    importanceTypeId: LocationImportanceType.major,
    description: "A major town in southwest and the only one to survive 'The Great Scourge'",
    coordsX: 790,
    coordsY: 3470,
    color_hex: "#5EB7B7",
    locationTypeId: LocationType.major_settlement,
    is_base: false
  },
  {
    id: 13,
    name: "Stoneheart Bastion",
    importanceTypeId: LocationImportanceType.common,
    description: "Ancient fortress guarding the northern cliffs.",
    coordsX: 1250,
    coordsY: 655,
    color_hex: "#1E293B",
    locationTypeId: LocationType.keep,
    is_base: false
  },
  {
    id: 14,
    name: "Elarin`s Hollow",
    importanceTypeId: LocationImportanceType.common,
    description: "Small village surrounded by enchanted woods.",
    coordsX: 1580,
    coordsY: 2450,
    color_hex: "#60A5FA",
    locationTypeId: LocationType.minor_settlement,
    is_base: false
  },
  {
    id: 15,
    name: "Redwatch Keep",
    importanceTypeId: LocationImportanceType.common,
    description: "Crimson-walled stronghold with storied past.",
    coordsX: 3020,
    coordsY: 950,
    color_hex: "#DC2626",
    locationTypeId: LocationType.keep,
    is_base: false
  },
  {
    id: 16,
    name: "Moonspire",
    importanceTypeId: LocationImportanceType.uncommon,
    description: "Shimmering city with towering moonlit spires.",
    coordsX: 2130,
    coordsY: 1820,
    color_hex: "#A78BFA",
    locationTypeId: LocationType.major_settlement,
    is_base: false
  },
  {
    id: 17,
    name: "Ashworn Cradle",
    importanceTypeId: LocationImportanceType.minor,
    description: "A ruined crater village lost to flame.",
    coordsX: 4345,
    coordsY: 1260,
    color_hex: "#78716C",
    locationTypeId: LocationType.ruins,
    is_base: false
  },
  {
    id: 18,
    name: "Thornreach",
    importanceTypeId: LocationImportanceType.common,
    description: "Dense woodland, rumored to be haunted.",
    coordsX: 4000,
    coordsY: 1450,
    color_hex: "#16A34A",
    locationTypeId: LocationType.wilds,
    is_base: false
  },
  {
    id: 19,
    name: "Plains of old",
    importanceTypeId: LocationImportanceType.common,
    description: "Territories completely destroyed in ancient war are now taken by wildlife.",
    coordsX: 2900,
    coordsY: 1500,
    color_hex: "#16A34A",
    locationTypeId: LocationType.wilds,
    is_base: false
  },
  {
    id: 20,
    name: "Blood Gold Camp",
    importanceTypeId: LocationImportanceType.common,
    description: "An old fortress and its surroundings now occupied by the mercenary lord",
    coordsX: 2110,
    coordsY: 2370,
    color_hex: "#16A34A",
    locationTypeId: LocationType.merc_camp,
    is_base: true
  },
  {
    id: 21,
    name: "Gem of the South",
    importanceTypeId: LocationImportanceType.common,
    description: "A city of light. The cities sacred army and holy people have stopped the spread of 'The Great Scourge'",
    coordsX: 2680,
    coordsY: 3200,
    color_hex: "#16A54A",
    locationTypeId: LocationType.pos_energy,
    is_base: false
  }
];
