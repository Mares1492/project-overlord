import {invertedRaceTypes} from '$lib/enums/enums'

/**
 * @typedef {Object} AssetObject
 * @property {string} face
 * @property {string} body
 * @typedef {Object.<string, AssetObject>} RaceAssets
 */

const setRaceTypes = () => {
    /** @type {RaceAssets} */
    let raceTypes = {}
    for (let race of Object.values(invertedRaceTypes)){
        raceTypes[race.toLowerCase()] = {
            face:"",
            body:"",
        }
    }
    return raceTypes
}

/**@param {string} race */
const getRaceString = (race) => race.replace(' ','_').toLocaleLowerCase()

/**@type {RaceAssets} */
const raceAssets = $state(setRaceTypes())

/**@param {string} race */
const importAssets = async race => {
    raceAssets[race].face = await import(`$lib/assets/characters/${race.toLowerCase()}/face.webp`).then(module => module.default);
    raceAssets[race].body = await import(`$lib/assets/characters/${race.toLowerCase()}/body.webp`).then(module => module.default);
    return raceAssets[race]
}

export const loadRaceAssets = async servants => {
    for (let servant of servants) {
        let raceString = getRaceString(servant.race)
        await importAssets(raceString)
    }
}

/**@param {string} race */
export const getRaceAssets = (race) => raceAssets[getRaceString(race)];

/**@param {string} race */
export const getRaceFace = (race) => getRaceAssets(race).face

/**@param {string} race */
export const getRaceBody = (race) => getRaceAssets(race).body
