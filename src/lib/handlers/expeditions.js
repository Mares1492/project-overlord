import expeditionTexts from "$lib/data/expedition_overview.json";
import {invertedLocationType} from "$lib/enums/enums.js"

/**@param {string} targetValue */
const getLocationType = (targetValue) => invertedLocationType[targetValue]

/** * Returns a random item from an array.
 * @param {Array<string>} arr - The array to pick from.
 * @return {string} A random item from the array.
 * */
const randomItem = arr => arr?arr[Math.floor(Math.random() * arr.length)]:"";

/**
 * @param {number} taskIndex - Index of the task.
 * @param {number} approachIndex - Index of the approach.
 * @param {number} scaleIndex - Index of the scale.
 * @param {string} locationType - Type of the location (e.g., "forest", "desert").  
 */
export const getExpeditionOverviewText = (taskIndex,approachIndex,scaleIndex,locationType) => {
    let overviewText = "";

    const taskText = randomItem(expeditionTexts.task[taskIndex].locations[getLocationType(locationType)]);
    const approachText = randomItem(expeditionTexts.approach[approachIndex].locations[getLocationType(locationType)]);
    const scaleText = randomItem(expeditionTexts.scale[scaleIndex].text);

    overviewText = `${taskText} ${approachText} ${scaleText}`;

    return overviewText;
}