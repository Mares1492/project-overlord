import servantsTemplate from '$lib/test_data/servants.json';
import {getRaceAssets} from '$lib/state/race.svelte.js';

//let servants = $state([]);
let servants = $state(JSON.parse(JSON.stringify(servantsTemplate)));

for (let servant of servants) {
    const {face,body} = await getRaceAssets(servant.race);
    servant.iconPath = face;
    servant.bodyPath = body;
}

export const setServants = (newServants) => servants = newServants;
export const getServants = () => servants;

const getServantById = (servantId) => {
    const servant = servants.find(s => s.id === servantId);
    if (!servant) {
        console.error(`Servant with provided ID not found.`);
        return null;
    }
    return servant;
}

/** @param {string} servantId */
export const setServantAsAvailable = (servantId) => {
    let servant = getServantById(servantId);
    if (servant) {
        servant.available = true;
        return true;
    }
    console.error(`Servant with provided ID is not found.`);
    return false;
}

/** @param {string} servantId */
export const setServantAsNotAvailable = (servantId) => {
    let servant = getServantById(servantId);
    if (!servant) {
        console.error(`Servant with provided ID is not found.`);
        return false;
    }
    if (!servant.available) {
        console.error(`Servant with provided ID is already not available.`);
        return false;
    }
    servant.available = false;
    return true;
}
