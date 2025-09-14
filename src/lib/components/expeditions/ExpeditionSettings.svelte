<script>
    import {expeditionSettings} from '$lib/state/expeditionSettings.svelte';
    import {getExpeditionOverviewText} from '$lib/handlers/expeditions.js';
    import ServantsList from '../servants/ServantsList.svelte';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    const {closeLocation, chosenLocation, handleExpeditionStartSuccess, servants} = $props();
    let expeditionOverviewText = $derived(getExpeditionOverviewText(expeditionSettings.task.value,expeditionSettings.approach.value,expeditionSettings.scale.value,chosenLocation.type.id))

    let chosenServantUUID = $state("");
    let chosenServant = $derived.by(()=>{
        if (servants && servants.length > 0) {
            if (!chosenServantUUID.length) {
                return servants[0]
            }
            return servants.find((servant)=>servant.uuid === chosenServantUUID);
        }

    });

    let isExpeditionLaunchAllowed = $state(true)

    onMount(()=>{
        if (!servants) {
            console.error("Servants are not found")
            return
        }
        chosenServantUUID = servants[0].uuid
    })

</script>

{#snippet expeditionSettingBtn (/** @type {string} */ title, handleClick, /** @type {boolean} */isChosen)}
    <button onclick={handleClick} class:bg-yellow-200={isChosen} class:border={isChosen} class="w-26 h-14 rounded hover:bg-yellow-300 bg-slate-200 cursor-pointer">{title}</button>
{/snippet}

{#if chosenServant}
    <form 
        id='startExpedition'  
        method="POST" 
        action="?/startExpedition" 
        use:enhance={()=> {
        isExpeditionLaunchAllowed = false
        return async ({ result, update }) => {
                await update()
                if (result.type === "success") {
                    handleExpeditionStartSuccess()
                    closeLocation()
                }
            }
        }
        }
    >
        <input type="hidden" name="locationId" value={chosenLocation.id}>
        <input type="hidden" name="taskId" value={expeditionSettings.task.value+1}>
        <input type="hidden" name="approachId" value={expeditionSettings.approach.value+1}>
        <input type="hidden" name="scaleId" value={expeditionSettings.scale.value+1}>
        <input type="hidden" name="servantUUID" value={chosenServant.uuid}>
        <input type="hidden" name="overviewText" value={expeditionOverviewText}>
    </form>
{/if}

<div class="w-full h-full flex justify-center bg-amber-900/50">
    <div class="relative w-3/4 xl:min-w-xl xl:w-1/2 min-h-full font-medium overflow-y-auto space-y-5 bg-amber-50 py-2.5 flex flex-col text-lg">
        <button onclick={closeLocation} class="absolute top-1.5 right-5 px-2 pt-0.5 text-center text-2xl cursor-pointer hover:bg-gray-500">X</button>
        <div class="w-full flex justify-center flex-col">
            <div class="flex flex-col mt-5 space-y-5">
                <div class="text-2xl px-5">
                    <i class="font-thin">Expedition to:</i>
                    <span class="font-black">{chosenLocation.name}</span>
                    <br>
                    <span class="text-xl">{chosenLocation.is_base?"Your Base & Surroundings":""}</span>
                    <!-- This section is for location icon--> 
                </div>
            <p class="px-5">{chosenLocation.description}</p>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Task</span>
                <div class="flex flex-row justify-around w-5/6 self-center">
                    {#each expeditionSettings.task.options as task,i(task.name)}
                        {@render expeditionSettingBtn(task.name,task.handleClick,expeditionSettings.task.value === i)}
                    {/each}
                </div>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Approach</span>
                <div class="flex flex-row justify-around  w-5/6 self-center">
                {#each expeditionSettings.approach.options as approach,i(approach.name)}
                    {@render expeditionSettingBtn(approach.name,approach.handleClick,expeditionSettings.approach.value === i)}
                {/each}
                </div>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Scale</span>
                <div class="flex flex-row justify-around  w-5/6 self-center">
                {#each expeditionSettings.scale.options as scale,i(scale.name)}
                    {@render expeditionSettingBtn(scale.name,scale.handleClick,expeditionSettings.scale.value === i)}
                {/each}
                </div>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Servant</span>
                {#if chosenServant}
                    <div class="flex flex-row justify-around h-36 font-semibold items-center text-start w-5/6 self-center rounded">
                        <ServantsList {servants}  bind:chosenServantUUID={chosenServantUUID} {chosenServant} isExpeditionSettings={true}/>
                    </div>
                {/if}
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Edict</span>
                <div class="flex flex-row justify-around h-36 font-semibold items-center text-start w-5/6 self-center rounded text-gray-900 py-2.5 px-5 border-2 border-gray-500 bg-gray-200">
                    <p>{expeditionOverviewText}</p> 
                </div>
            </div>
        </div>
        {#if chosenServant}
            <button disabled={!isExpeditionLaunchAllowed} form="startExpedition" type="submit" class="w-5/6 disabled:cursor-progress disabled:bg-gray-200 self-center cursor-pointer text-gray-700 hover:text-gray-900 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 font-bold py-2 px-4 rounded mt-5" >
                Launch Expedition
            </button>
        {/if}
    </div>
</div>
