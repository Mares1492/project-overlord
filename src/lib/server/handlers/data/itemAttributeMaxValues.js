import {ItemType,ItemRarity,AttributeTypes} from '$lib/enums/enums'

export const maxAttributeValues = {
    [ItemType.helmet]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 2,
            [AttributeTypes.endurance]: 1,
            [AttributeTypes.strength]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 2,
            [AttributeTypes.endurance]: 2,
            [AttributeTypes.strength]: 1,
            [AttributeTypes.focus]: 1,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 3,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.strength]: 1,
            [AttributeTypes.focus]: 1,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 4,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 1,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.endurance]: 4,
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 2,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.strength]: 3,
            [AttributeTypes.focus]: 2,
        },
    },
    [ItemType.hat]: {
        [ItemRarity.common]: {
            [AttributeTypes.focus]: 2,
            [AttributeTypes.intelligence]: 1,
            [AttributeTypes.morale]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.focus]: 2,
            [AttributeTypes.intelligence]: 2,
            [AttributeTypes.morale]: 1,
            [AttributeTypes.tactics]: 1,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.focus]: 3,
            [AttributeTypes.intelligence]: 3,
            [AttributeTypes.morale]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.focus]: 4,
            [AttributeTypes.intelligence]: 3,
            [AttributeTypes.morale]: 2,
            [AttributeTypes.tactics]: 1,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.focus]: 5,
            [AttributeTypes.intelligence]: 4,
            [AttributeTypes.morale]: 2,
            [AttributeTypes.tactics]: 2,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.focus]: 5,
            [AttributeTypes.intelligence]: 5,
            [AttributeTypes.morale]: 3,
            [AttributeTypes.tactics]: 2,
        },
    },
    [ItemType.armor]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 10,
            [AttributeTypes.endurance]: 1,
            [AttributeTypes.strength]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 16,
            [AttributeTypes.endurance]: 2,
            [AttributeTypes.strength]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 22,
            [AttributeTypes.endurance]: 2,
            [AttributeTypes.strength]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 28,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.strength]: 4,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 40,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.strength]: 8,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 50,
            [AttributeTypes.endurance]: 10,
            [AttributeTypes.strength]: 10,
        },
    },
    [ItemType.legs]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 8,
            [AttributeTypes.endurance]: 2,
            [AttributeTypes.strength]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 14,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.strength]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 20,
            [AttributeTypes.endurance]: 4,
            [AttributeTypes.strength]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 24,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.strength]: 4,
            [AttributeTypes.agility]: 1,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 27,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.strength]: 5,
            [AttributeTypes.agility]: 2,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 30,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.strength]: 5,
            [AttributeTypes.agility]: 5,
        },
    },
    [ItemType.feet]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.agility]: 2,
            [AttributeTypes.endurance]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 9,
            [AttributeTypes.agility]: 3,
            [AttributeTypes.endurance]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 13,
            [AttributeTypes.agility]: 4,
            [AttributeTypes.endurance]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 16,
            [AttributeTypes.agility]: 5,
            [AttributeTypes.endurance]: 4,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 18,
            [AttributeTypes.agility]: 5,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.stealth]: 1,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 20,
            [AttributeTypes.agility]: 5,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.stealth]: 5,
        },
    },
    [ItemType.hands]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.strength]: 1,
            [AttributeTypes.dexterity]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 9,
            [AttributeTypes.strength]: 2,
            [AttributeTypes.dexterity]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 13,
            [AttributeTypes.strength]: 3,
            [AttributeTypes.dexterity]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 16,
            [AttributeTypes.strength]: 4,
            [AttributeTypes.dexterity]: 4,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 18,
            [AttributeTypes.strength]: 5,
            [AttributeTypes.dexterity]: 5,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 20,
            [AttributeTypes.strength]: 5,
            [AttributeTypes.dexterity]: 5,
            [AttributeTypes.endurance]: 5,
        },
    },
    [ItemType.weapon]: {
        [ItemRarity.common]: {
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 1,
            [AttributeTypes.dexterity]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.strength]: 3,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.dexterity]: 1,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.strength]: 4,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.dexterity]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.dexterity]: 2,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 4,
            [AttributeTypes.dexterity]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.dexterity]: 5,
        },
    },
    [ItemType.two_handed_weapon]: {
        [ItemRarity.common]: {
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 1,
            [AttributeTypes.endurance]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.strength]: 3,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.endurance]: 1,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.strength]: 4,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.endurance]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.endurance]: 2,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 4,
            [AttributeTypes.endurance]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.endurance]: 5,
        },
    },

    [ItemType.off_hand]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 2,
            [AttributeTypes.endurance]: 1,
            [AttributeTypes.tactics]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 2,
            [AttributeTypes.endurance]: 2,
            [AttributeTypes.tactics]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 3,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.tactics]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 4,
            [AttributeTypes.endurance]: 3,
            [AttributeTypes.tactics]: 3,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.endurance]: 4,
            [AttributeTypes.tactics]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.endurance]: 5,
            [AttributeTypes.tactics]: 5,
        },
    },
    [ItemType.magic_off_hand]: {
        [ItemRarity.common]: {
            [AttributeTypes.intelligence]: 2,
            [AttributeTypes.focus]: 1,
            [AttributeTypes.healing_rate]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.intelligence]: 2,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.healing_rate]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.intelligence]: 3,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.healing_rate]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.intelligence]: 4,
            [AttributeTypes.focus]: 4,
            [AttributeTypes.healing_rate]: 2,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.intelligence]: 5,
            [AttributeTypes.focus]: 4,
            [AttributeTypes.healing_rate]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.intelligence]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.healing_rate]: 5,
        },
    },
    [ItemType.medalion]: {
        [ItemRarity.common]: {
            [AttributeTypes.morale]: 2,
            [AttributeTypes.focus]: 1,
            [AttributeTypes.tactics]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.morale]: 2,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.tactics]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.morale]: 3,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.tactics]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.morale]: 4,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.tactics]: 3,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.morale]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.tactics]: 5,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.morale]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.tactics]: 5,
            [AttributeTypes.healing_rate]: 5
        },
    },
    [ItemType.trinket]: {
        [ItemRarity.common]: {
            [AttributeTypes.focus]: 2,
            [AttributeTypes.tactics]: 1,
            [AttributeTypes.stealth]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.focus]: 2,
            [AttributeTypes.tactics]: 2,
            [AttributeTypes.stealth]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.focus]: 3,
            [AttributeTypes.tactics]: 3,
            [AttributeTypes.stealth]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.focus]: 4,
            [AttributeTypes.tactics]: 3,
            [AttributeTypes.stealth]: 3,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.focus]: 5,
            [AttributeTypes.tactics]: 4,
            [AttributeTypes.stealth]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.focus]: 5,
            [AttributeTypes.tactics]: 5,
            [AttributeTypes.stealth]: 5,
        },
    },
    [ItemType.hood]: {
        [ItemRarity.common]: {
            [AttributeTypes.armor]: 1,
            [AttributeTypes.intelligence]: 1,
            [AttributeTypes.focus]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.armor]: 2,
            [AttributeTypes.intelligence]: 2,
            [AttributeTypes.focus]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.armor]: 3,
            [AttributeTypes.intelligence]: 3,
            [AttributeTypes.focus]: 3,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.armor]: 4,
            [AttributeTypes.intelligence]: 4,
            [AttributeTypes.dexterity]: 4,
            [AttributeTypes.focus]: 4,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.armor]: 5,
            [AttributeTypes.intelligence]: 5,
            [AttributeTypes.dexterity]: 5,
            [AttributeTypes.focus]: 5,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.armor]: 10,
            [AttributeTypes.intelligence]: 10,
            [AttributeTypes.dexterity]: 5,
            [AttributeTypes.focus]: 10,
        },
    },
    [ItemType.magic_sword]: {
        [ItemRarity.common]: {
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 1,
            [AttributeTypes.intelligence]: 1,
        },
        [ItemRarity.uncommon]: {
            [AttributeTypes.strength]: 2,
            [AttributeTypes.focus]: 2,
            [AttributeTypes.intelligence]: 2,
        },
        [ItemRarity.rare]: {
            [AttributeTypes.strength]: 3,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.intelligence]: 2,
        },
        [ItemRarity.epic]: {
            [AttributeTypes.strength]: 4,
            [AttributeTypes.focus]: 3,
            [AttributeTypes.intelligence]: 3,
        },
        [ItemRarity.mythic]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 4,
            [AttributeTypes.intelligence]: 4,
        },
        [ItemRarity.legendary]: {
            [AttributeTypes.strength]: 5,
            [AttributeTypes.focus]: 5,
            [AttributeTypes.intelligence]: 5,
        },
    },
};

