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

/** 
 * @param {string} servantId 
 * @param {boolean} available
*/
export const setServantAvailability = (servantId, available) => {
    const servant = servants.find(s => s.id === servantId);
    if (servant) {
        servant.available = available;  
        return true;
    }
    return false;
}
