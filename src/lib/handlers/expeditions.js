import expeditionTexts from "$lib/data/expedition_overview.json";

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

    // Assuming you have imported or defined `expeditionTexts` as your full JSON
    console.log(randomItem(expeditionTexts.task[taskIndex].locations[locationType]));
    // Grab matching sets
    const taskText = randomItem(expeditionTexts.task[taskIndex].locations[locationType]) || [];
    const approachText = randomItem(expeditionTexts.approach[approachIndex].locations[locationType]) || [];
    const scaleText = randomItem(expeditionTexts.scale[scaleIndex].text) || [];

    // Merge together into overview
    overviewText = `${taskText} ${approachText} ${scaleText}`;

    return overviewText;
}