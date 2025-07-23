import { setServantAvailability } from '$lib/state/servants.svelte.js';

export const expeditionsList = $state([]);
let avalableExpeditionsNumber = $state(3);

const expeditionStatus = {
    IDLE: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    FAILED: 3,
}

//exp -> expedition
const expeditionTemplate = {
    location: undefined,
    endTime: undefined,
    startTime: undefined,
    servantId: undefined,
    status: expeditionStatus.IDLE,
}

export const getAvailableExpeditionsNumber = () => avalableExpeditionsNumber;

export const decreaseAvailableExpeditionsNumber = () => avalableExpeditionsNumber = Math.max(0, avalableExpeditionsNumber - 1);

export const increaseAvailableExpeditionsNumber = () => avalableExpeditionsNumber += 1;

export const addExpedition = (expeditionSettings,servantId) => {
    if(!setServantAvailability(servantId, false)){
        console.log(`Servant with provided ID is not found.`);
        return null;
    }
    const newExpedition = JSON.parse(JSON.stringify(expeditionTemplate));
    newExpedition.location = expeditionSettings.chosenLocation;
    newExpedition.startTime = new Date();
    let duration = expeditionSettings.scale.value * 60; // Convert minutes to second
    newExpedition.endTime = new Date(newExpedition.startTime.getTime() + (duration>0?duration:1) * 60 * 1000);
    newExpedition.servantId = servantId;
    newExpedition.status = expeditionStatus.IN_PROGRESS;
    expeditionsList.push(newExpedition);
    decreaseAvailableExpeditionsNumber();
    return newExpedition;
}


