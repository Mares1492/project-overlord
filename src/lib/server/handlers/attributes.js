import {maxAttributeValues} from '$lib/server/handlers/data/itemAttributeMaxValues'

/**@param {number} poolValue @param {number} maxAttributeValue */
const getRandomAttributeValue = (poolValue,maxAttributeValue = 5) => {
    const upTo = Math.max(Math.min(poolValue,maxAttributeValue),0)
    return Math.floor(Math.random() * upTo) + 1;
}

/**@param {Object} attributesToGenerate @param {number} maxTotalValue*/
export const getRandomServantAttributeValues = (attributesToGenerate,maxTotalValue) => {
    let poolValue = maxTotalValue
    /**@type {Object<string,number>} */
    const result = {}
    for (const key in attributesToGenerate){
        const newValue = getRandomAttributeValue(poolValue)
        poolValue -= newValue
        result[key] = newValue
    }
    return result
}

export const getItemRandomAttributeValues = (itemTypeId, rarityTypeId) => {
    const attributeMaxValues = maxAttributeValues[itemTypeId][rarityTypeId]
    /**@type {Object<number,number>} */
    const result = {}
    for (const key in attributeMaxValues){
        //pool value is half of max value 
        const newValue = getRandomAttributeValue(Math.round(attributeMaxValues[key]*0.5),attributeMaxValues[key])
        result[key] = newValue
    }
    return result
}
