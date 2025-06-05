const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}
/** @return {string}*/
export const generateDarkFantasyName = () => {
    const prefixes = [
        "Lord", "Dread", "Arch", "High", "Wretched", "Obsidian", "Vile", "Iron", "Dark", "Crimson"
    ];

    const cores = [
        "Malgrim", "Thorne", "Varkul", "Zaroth", "Drazhul", "Morvain", "Skarn", "Velmorr", "Grivak", "Nyther"
    ];

    const suffixes = [
        "the Cruel", "of the Abyss", "the Eternal", "Soulrender", "the Forsaken", "Bloodreign",
        "of Blackspire", "the Undying", "the Withered", "of the Void"
    ];

    return `${getRandomElement(prefixes)} ${getRandomElement(cores)} ${getRandomElement(suffixes)}`;
}
