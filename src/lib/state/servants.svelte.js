// THIS STATE FILE WAS USED FOR FRONTEND TESTING PURPOSES

import {getRaceAssets} from '$lib/state/race.svelte.js';

let servants = $state([]);

export const initAssets = async () => {
    if (servants.length === 0) {
        console.warn("No servants found to initialize assets for.");
        return;
    }
    if (servants[0].iconPath && servants[0].bodyPath) {
        console.warn("Servants assets already initialized, skipping.");
        return;
    }
    for (let servant of servants) {
        const {face,body} = await getRaceAssets(servant.race);
        servant.iconPath = face;
        servant.bodyPath = body;
    }
}

export const setServants = (newServants) => {
    servants = newServants
    initAssets();
};
export const getServants = () => servants;

export const getServantByUUID = (servantUUID) => {
    const servant = servants.find(s => s.uuid === servantUUID);
    if (!servant) {
        console.error(`Servant with provided UUID not found.`);
        return null;
    }
    return servant;
}

/** @param {string} servantUUID */
export const setServantAsAvailable = (servantUUID) => {
    // TODO: call action to update DB
    return true;
}

/** @param {string} servantUUID */
export const setServantAsNotAvailable = (servantUUID) => {
    // TODO: call action to update DB
    return true;
}
