<script>
    import {expeditionSettings} from '$lib/state/expeditionSettings.svelte';
    import {getExpeditionOverviewText} from '$lib/handlers/expeditions.js';
    import ServantsList from '../servants/ServantsList.svelte';
    import {addExpedition} from '$lib/state/expeditionState.svelte.js';
    import { getServants } from '$lib/state/servants.svelte';

    const {closeLocation, chosenLocation} = $props();
    let chosenServant = $state(getServants()[0]);

    const launchExpedition = () => {
        let newExpedition = addExpedition(expeditionSettings,chosenLocation, chosenServant.id)

        if (newExpedition === null) {
            console.error(`Failed to launch expedition: Servant is not found.`);
            return;
        }
        closeLocation();
    }

</script>

{#snippet expeditionSettingBtn (/** @type {string} */ title, handleClick, /** @type {boolean} */isChosen)}
    <button onclick={handleClick} class:bg-yellow-200={isChosen} class:border={isChosen} class="w-26 h-14 rounded hover:bg-yellow-300 bg-slate-200 cursor-pointer">{title}</button>
{/snippet}

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
                <div class="flex flex-row justify-around h-36 font-semibold items-center text-start w-5/6 self-center rounded">
                   <ServantsList bind:chosenServant={chosenServant} isExpedition={true}/>
                </div>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5 font-black">Edict</span>
                <div class="flex flex-row justify-around h-36 font-semibold items-center text-start w-5/6 self-center rounded text-gray-900 py-2.5 px-5 border-2 border-gray-500 bg-gray-200">
                    <!-- This section is for overview text -->
                   <p>{getExpeditionOverviewText(expeditionSettings.task.value,expeditionSettings.approach.value,expeditionSettings.scale.value,chosenLocation.type)}</p> 
                </div>
            </div>
        </div>
        <button class="w-5/6 self-center cursor-pointer text-gray-700 hover:text-gray-900 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 font-bold py-2 px-4 rounded mt-5" onclick={launchExpedition}>
            Launch Expedition
        </button>
    </div>
</div>
