import {ItemType,EquipmentSlot,ItemRarity,AttributeTypes} from '../../../enums/enums'

export const itemTypeValues = [
  { id:ItemType.helmet, name: "helmet" },
  { id:ItemType.hat, name: "hat" },
  { id:ItemType.armor, name: "armor" },
  { id:ItemType.legs, name: "legs" },
  { id:ItemType.feet, name: "feet" },
  { id:ItemType.hands, name: "hands" },
  { id:ItemType.weapon, name: "weapon" },
  { id:ItemType.two_handed_weapon, name: "two handed weapon" },
  { id:ItemType.off_hand, name: "off-hand" },
  { id:ItemType.magic_off_hand, name: "magic off-hand" },
  { id:ItemType.medalion, name: "medalion" },
  { id:ItemType.trinket, name: "trinket" },
  { id:ItemType.hood, name: "trinket" }
]

export const itemSlotTypeValues = [
  { id:EquipmentSlot.head, name: "head" },
  { id:EquipmentSlot.neck, name: "neck" },
  { id:EquipmentSlot.body, name: "body" },
  { id:EquipmentSlot.hands, name: "hands"},
  { id:EquipmentSlot.legs, name: "legs" },
  { id:EquipmentSlot.feet, name: "feet" },
  { id:EquipmentSlot.first_hand, name: "main hand" },
  { id:EquipmentSlot.off_hand, name: "off-hand" },
]

export const itemRarityTypeValues = [
  { id:ItemRarity.common, name: "common" },
  { id:ItemRarity.uncommon, name: "uncommon" ,color_hex:"#1eff00"},
  { id:ItemRarity.rare, name: "rare",color_hex:"#0070dd" },
  { id:ItemRarity.epic, name: "epic",color_hex:"#ffea00" },
  { id:ItemRarity.mythic, name: "mythic",color_hex:"#a335ee" },
  { id:ItemRarity.legendary, name: "legendary",color_hex:"#ff8000" },
]

export const itemRarityValues = [
    {
        id:1,
        itemId: 1,
        name: "Shadowfang Aegis",
        itemRarityTypeId: ItemRarity.rare,
        description: "Forged in the black fires beneath Hollowreach, this shield deflects not just blades, but hope itself."
    },
    {
        id:2,
        itemId: 2,
        name: "Whisperblade of the Pale Queen",
        itemRarityTypeId: ItemRarity.epic,
        description: "A blade so thin it hums in silence, said to have slain kings in their sleep."
    },
    {
        id:3,
        itemId: 2,
        name: "Iron dagger",
        itemRarityTypeId: ItemRarity.common,
        description: "Common iron dagger"
    },
    {
        id:4,
        itemId: 3,
        name: "Cowl of Eternal Dread",
        itemRarityTypeId: ItemRarity.rare,
        description: "Common iron dagger"
    },
    {
        id:5,
        itemId: 3,
        name: "Common hood",
        itemRarityTypeId: ItemRarity.common,
        description: "Common silk hood"
    },
    {
        id:6,
        itemId: 4,
        name: "Skull of the Withered God",
        itemRarityTypeId: ItemRarity.mythic,
        description: "This artifact grants forbidden knowledge but draws the gaze of unspeakable horrors."
    },
    {
        id:7,
        itemId: 4,
        name: "Skull of the Withered God",
        itemRarityTypeId: ItemRarity.mythic,
        description: "This artifact grants forbidden knowledge but draws the gaze of unspeakable horrors."
    },
    {
        id: 8,
        itemId: 5,
        name: "Graveforged Gauntlets",
        itemRarityTypeId: ItemRarity.uncommon,
        description: "Heavy iron gauntlets etched with runes from the Dead Tongue, worn by gravediggers and warriors alike."
    },
    {
        id: 9,
        itemId: 5,
        name: "Graveforged Gauntlets",
        itemRarityTypeId: ItemRarity.common,
        description: "Heavy iron gauntlets, worn by gravediggers and warriors alike."
    },
    {
        id: 10,
        itemId: 6,
        name: "Chromium Light Cuirass",
        itemRarityTypeId: ItemRarity.rare,
        description: "Assault cuirass made from chromium alloy, light yet durable. It shines with a faint blue hue."
    },
    {
        id: 11,
        itemId: 6,
        name: "Steel Cuirass",
        itemRarityTypeId: ItemRarity.uncommon,
        description: "Assault cuirass. Simple but perfect."
    },
    {
        id: 12,
        itemId: 7,
        name: "Mystic scroll",
        itemRarityTypeId: ItemRarity.mythic,
        description: "Mystic scroll carved with banshee runes, pulsing with necrotic energy."
    },
    {
        id: 13,
        itemId: 7,
        name: "Magic scroll",
        itemRarityTypeId: ItemRarity.rare,
        description: "Magic scroll, helps to cast fast battle spells."
    },
    {
        id: 14,
        itemId: 8,
        name: "Ashborne Skullplate",
        itemRarityTypeId: ItemRarity.mythic,
        description: "Helm of a fallen ash knight, eternally warm to the touch and whispering vengeance."
    },
    {
        id: 15,
        itemId: 8,
        name: "Daemon Head",
        itemRarityTypeId: ItemRarity.legendary,
        description: "Legends tell a story about a daemon lord who lost his head in battle with an eternal king..."
    },
    {
        id: 16,
        itemId: 9,
        name: "Bloodbane Scimitar",
        itemRarityTypeId: ItemRarity.uncommon,
        description: "Reaps both soul and sinew. The blade rusts unless fed monthly."
    },
    {
        id: 17,
        itemId: 9,
        name: "Scimitar",
        itemRarityTypeId: ItemRarity.common,
        description: "Common 'sword' from far lands"
    },
    {
        id: 18,
        itemId: 10,
        name: "Hearth of the Dragon",
        iconPath: "neck/Ruby necklace(uncommon).png",
        itemRarityTypeId: ItemRarity.rare,
        description: "A necklace with a ruby that glows faintly, said to contain the heart of a dragon. It grants warmth and protection against cold."
    },
    {
        id: 19,
        itemId: 10,
        name: "Fire Keeper",
        iconPath: "neck/Ruby necklace(uncommon).png",
        itemRarityTypeId: ItemRarity.uncommon,
        description: "A ruby necklace that holds magic and grants power"
    }


]

export const itemValues = [
    {
        id: 1,
        name: "Ornate Shield",
        iconPath: "off_hand/Ornate Shield(rare).png",
        itemTypeId: ItemType.off_hand,
        slotTypeId: EquipmentSlot.off_hand,
        
    },
    {
        id: 2,
        name: "Iron Dagger",
        iconPath: "off_hand/Iron off hand dagger.png",
        itemTypeId: ItemType.off_hand,
        slotTypeId: EquipmentSlot.off_hand,
    },
    {
        id: 3,
        name: "Silk Hood",
        iconPath: "head/Stealth hood.png",
        itemTypeId: ItemType.hood,
        slotTypeId: EquipmentSlot.head
    },
    {
        id: 4,
        name: "Horned Skull",
        iconPath: "magic_off_hand/Horned skull(rare).png",
        itemTypeId: ItemType.magic_off_hand,
        slotTypeId: EquipmentSlot.off_hand,
    },
    {
        id: 5,
        name: "Iron Gauntlets",
        iconPath: "hands/Iron gauntlets.png",
        itemTypeId: ItemType.hands,
        slotTypeId: EquipmentSlot.hands,
    },
    {
        id: 6,
        name: "Cuirass",
        iconPath: "armor/Chromium light cuirass(uncommon).png",
        itemTypeId: ItemType.armor,
        slotTypeId: EquipmentSlot.body,
    },
    {
        id: 7,
        name: "Magic scroll",
        iconPath: "magic_off_hand/Mystic scroll(rare).png",
        itemTypeId: ItemType.magic_off_hand,
        slotTypeId: EquipmentSlot.hands,
    },
    {
        id: 8,
        name: "Obsidian Helmet",
        iconPath: "head/Demon horns(artifactum).png",
        itemTypeId: ItemType.helmet,
        slotTypeId: EquipmentSlot.head,
    },
    {
        id: 9,
        name: "Scimitar",
        iconPath: "weapon/Mage blade(uncommon).png",
        itemTypeId: ItemType.weapon,
        slotTypeId: EquipmentSlot.first_hand,
    },
    {
        id: 10,
        name: "Hearth of the Dragon",
        iconPath: "neck/Ruby necklace(uncommon).png",
        itemTypeId: ItemType.medalion,
        slotTypeId: EquipmentSlot.neck,
        description: "A necklace with a ruby that glows faintly, said to contain the heart of a dragon. It grants warmth and protection against cold."
    }
];
