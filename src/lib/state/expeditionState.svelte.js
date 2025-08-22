import { setServantAsNotAvailable, setServantAsAvailable } from '$lib/state/servants.svelte.js';
import {ExpeditionStatus} from '$lib/enums/enums.js'

export const expeditionsList = $state([]);
let avalableExpeditionsNumber = $state(3);

//exp -> expedition
const expeditionTemplate = {
    id: undefined,
    location: undefined,
    overviewText: undefined,
    endTime: undefined,
    startTime: undefined,
    servantUUID: undefined,
    task: undefined,
    scale: undefined,
    approach: undefined,
    status: ExpeditionStatus.IDLE,
}

const getDuration = (expScaleValue) => {
    switch (expScaleValue) {
        case 0:
            return 15;
        case 1:
            return 30;
        case 2:
            return 45;
        default:
            return 60;
    }
}

export const getAvailableExpeditionsNumber = () => avalableExpeditionsNumber;

export const decreaseAvailableExpeditionsNumber = () => avalableExpeditionsNumber = Math.max(0, avalableExpeditionsNumber - 1);

export const increaseAvailableExpeditionsNumber = () => avalableExpeditionsNumber += 1;

export const addExpedition = (expeditionSettings,chosenLocation,servantUUID,expeditionOverviewText) => {
    if(!setServantAsNotAvailable(servantUUID)) {
        console.log(`Servant with provided ID is not found.`);
        return null;
    }
    if (avalableExpeditionsNumber <= 0) {
        console.log(`No available expeditions left.`); 
        return null;
    }

    const newExpedition = JSON.parse(JSON.stringify(expeditionTemplate));
    newExpedition.id = crypto.randomUUID();
    newExpedition.location = chosenLocation;
    newExpedition.startTime = new Date(); 
    newExpedition.overviewText = expeditionOverviewText

    let duration = getDuration(expeditionSettings.scale.value);
    
    newExpedition.endTime = new Date(newExpedition.startTime.getTime() + (duration * 1000));
    newExpedition.servantUUID = servantUUID;
    newExpedition.status = ExpeditionStatus.IN_PROGRESS;
    newExpedition.task = expeditionSettings.task.options[expeditionSettings.task.value].name;
    newExpedition.approach = expeditionSettings.approach.options[expeditionSettings.approach.value].name;
    newExpedition.scale = expeditionSettings.scale.options[expeditionSettings.scale.value].name;
    expeditionsList.push(newExpedition);
    decreaseAvailableExpeditionsNumber();
    return newExpedition;
}


export const getExpeditionById = (expeditionId) => {
    return expeditionsList.find(exp=>exp.id===expeditionId)
}

export const completeExpedition = (expeditionId) => {
    const expedition = getExpeditionById(expeditionId)
    if (!expedition) {
        return false
    }
    if (expedition.status === ExpeditionStatus.IN_PROGRESS) {
        expedition.status = ExpeditionStatus.COMPLETED;
    }
    return true
}

export const archiveExpedition = (expeditionId) => {
    const expedition = getExpeditionById(expeditionId)
    if (!expedition) {
        return false
    }
    if (expedition.status === ExpeditionStatus.COMPLETED) {
        expedition.status = ExpeditionStatus.ARCHIVED;
        increaseAvailableExpeditionsNumber();
        setServantAsAvailable(expedition.servantId);
    }
    
    return true
}

export const getOngoingExpeditions = () => {
    return expeditionsList.filter(exp => (exp.status === ExpeditionStatus.IN_PROGRESS || exp.status === ExpeditionStatus.COMPLETED));
}

export const getCompletedExpeditions = () => {
    return expeditionsList.filter(exp => exp.status === ExpeditionStatus.COMPLETED);
}

export const getAllExpeditions = () => {
    return expeditionsList
}
