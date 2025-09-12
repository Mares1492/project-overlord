import {getKeepData} from '$lib/server/services/keeps'
import { handleBuildingUpgrade } from '$lib/server/services/keeps'
import { error } from 'console'

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    const KeepData = await getKeepData(params.uuid)
    return {keep:KeepData}
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
    upgradeBuilding: async ({ request }) => {
        const data = await request.formData();
        const buildingId = data.get('buildingId')
        const buildingType = data.get('buildingType')
        if (!buildingId || !buildingType) {
            console.log("could not read input data")
            return {error:true,message:"could not read input data"}
        }
        await handleBuildingUpgrade(buildingType, buildingId)
    }
}
