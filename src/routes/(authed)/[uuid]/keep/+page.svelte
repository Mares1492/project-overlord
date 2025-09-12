<script>
    import { buildingIcons } from "$lib/state/items";
    import {goto} from "$app/navigation";
    import { enhance } from "$app/forms";
    import { BuildingTypes,invertedBuildingTypes } from "$lib/enums/enums";
    import LoadingIcon from "$lib/components/display/LoadingIcon.svelte";

    let {data} = $props();
    let buildingStates = $state({
        upgradeAvailable:{
            [invertedBuildingTypes[BuildingTypes.keep]]:true,
            [invertedBuildingTypes[BuildingTypes.barracks]]:true,
            [invertedBuildingTypes[BuildingTypes.treasury]]:true,
            [invertedBuildingTypes[BuildingTypes.arsenal]]:true,
            [invertedBuildingTypes[BuildingTypes.academy]]:true,
            [invertedBuildingTypes[BuildingTypes.tomb]]:true
        }
    })
    let chosenBuilding = $state()

    const handleBuildingClick = (buildingType,buildingId) => {
        chosenBuilding = {
            buildingType,
            buildingId
        }
    }

    const onEnhance = () => {
        buildingStates.upgradeAvailable[chosenBuilding.buildingType] = false
        return async ({result,update}) => {
            await update()
            buildingStates.upgradeAvailable[result.data.buildingType] = true
        }
    }

</script>
<div class="h-full w-full flex justify-center align-middle">
    <form 
        class="w-full h-full flex" 
        id='upgradeBuilding'  
        method="POST" 
        action="?/upgradeBuilding" 
        use:enhance={onEnhance}>
        {#if chosenBuilding}
            <input type="hidden" name="buildingId" value={chosenBuilding.buildingId}>
            <input type="hidden" name="buildingType" value={chosenBuilding.buildingType}>
        {/if}
        <div class="w-full grid grid-cols-2 md:grid-cols-3 gap-x-2.5 xl:gap-x-5 xl:gap-y-20 xl:px-8 xl:pt-5 place-items-center">
            {#each Object.entries(data.keep) as [key,building](building.name)}
                <div class={`relative rounded-xl w-30 h-30 bg-black md:w-42 md:h-42 xl:w-64 xl:h-64 text-lg xl:text-xl text-white backdrop-opacity-50 justify-center flex flex-col }`}>
                    {#await buildingIcons[`/src/lib/assets/icons/keep/${key}.webp`]() then src}
                        <img class="absolute rounded-xl top-0 left-0 w-full h-full object-cover -z-1" src={src.default} alt={key}>
                    {/await}
                    {#if buildingStates.upgradeAvailable[key]}
                        <button type="button" onclick={()=>goto(`/${data.pathUUID}/${key}`)} class="h-1/2 rounded-t-xl cursor-pointer hover:bg-amber-100 active:bg-amber-200 hover:text-gray-800 hover:font-extrabold flex items-center justify-center flex-col space-y-1.5">
                            {building.name}
                        </button>
                        <button type="submit" onclick={()=>handleBuildingClick(key,building.id)} class="h-1/2 flex flex-col max-sm:text-sm rounded-b-xl cursor-pointer hover:bg-amber-100 active:bg-amber-200 bg-amber-50 text-gray-800 font-extrabold border-t-2 border-black items-center justify-center">
                            <span>lvl: {building.lvl}</span>
                            Upgrade: {building.upgradePrice}
                        </button>
                    {:else}
                        <LoadingIcon/>
                    {/if}
                </div>
            {/each}
        </div>
    </form>
</div>
