/** @type {{human:undefined|{face:string,body:string}}} */
const raceAssets = {
    human: undefined,
    // Add other
}
/**@param {string} race */
const importAssets = async race => {
    raceAssets[race]= {}
    raceAssets[race].face = await import(`$lib/assets/characters/${race.toLowerCase()}/face.webp`).then(module => module.default);
    raceAssets[race].body = await import(`$lib/assets/characters/${race.toLowerCase()}/body.webp`).then(module => module.default);
}
/**@param {string} race */
export const getRaceAssets = async race => {
    if (!raceAssets[race]) {
        await importAssets(race)
    }
    return raceAssets[race];
}
