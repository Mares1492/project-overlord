import { setServantAsNotAvailable, setServantAsAvailable } from '$lib/state/servants.svelte.js';

export const expeditionsList = $state([]);
let avalableExpeditionsNumber = $state(3);

export const expeditionStatus = {
    IDLE: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    ARCHIVED: 3,
    FAILED: 4,
}

//exp -> expedition
const expeditionTemplate = {
    id: undefined,
    location: undefined,
    endTime: undefined,
    startTime: undefined,
    servantId: undefined,
    task: undefined,
    scale: undefined,
    approach: undefined,
    status: expeditionStatus.IDLE,
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

export const addExpedition = (expeditionSettings,chosenLocation,servantId) => {
    if(!setServantAsNotAvailable(servantId)) {
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

    let duration = getDuration(expeditionSettings.scale.value);
    
    newExpedition.endTime = new Date(newExpedition.startTime.getTime() + (duration * 1000));
    newExpedition.servantId = servantId;
    newExpedition.status = expeditionStatus.IN_PROGRESS;
    newExpedition.task = expeditionSettings.task.options[expeditionSettings.task.value].name;
    newExpedition.approach = expeditionSettings.approach.options[expeditionSettings.approach.value].name;
    newExpedition.scale = expeditionSettings.scale.options[expeditionSettings.scale.value].name;
    expeditionsList.push(newExpedition);
    decreaseAvailableExpeditionsNumber();
    return newExpedition;
}

export const completeExpedition = (expeditionId) => {
    const expedition = expeditionsList.find(exp => exp.id === expeditionId);
    if (!expedition) {
        return false
    }
    if (expedition.status === expeditionStatus.IN_PROGRESS) {
        expedition.status = expeditionStatus.COMPLETED;
    }
    return true
}

export const archiveExpedition = (expeditionId) => {
    const expedition = expeditionsList.find(exp => exp.id === expeditionId);
    if (!expedition) {
        return false
    }
    if (expedition.status === expeditionStatus.COMPLETED) {
        expedition.status = expeditionStatus.ARCHIVED;
        increaseAvailableExpeditionsNumber();
        setServantAsAvailable(expedition.servantId);
    }
    
    return true
}

export const getOngoingExpeditions = () => {
    return expeditionsList.filter(exp => (exp.status === expeditionStatus.IN_PROGRESS || exp.status === expeditionStatus.COMPLETED));
}

export const getCompletedExpeditions = () => {
    return expeditionsList.filter(exp => exp.status === expeditionStatus.COMPLETED);
}

export const getAllExpeditions = () => {
    return expeditionsList
}
