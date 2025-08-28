<script>
    import {onMount} from 'svelte';
   	import { slide,scale } from 'svelte/transition';
    import {ExpeditionStatus} from '$lib/enums/enums.js';
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    const {pathUUID,ongoingExpeditions} = $props()

    
    /**
        * @typedef {Object.<string, TimeObject>} expeditionsTimeCounts
         * @typedef {Object} TimeObject
         * @property {number} seconds
         * @property {number} minutes
         * @property {number} hours
     */
    let expeditionsTimeCounts = $state({});
    let chosenExpeditionUUID = $state("");
    let pageState = $state({
        loading: true,
        isBlocking: false,
        error: false
    });

    const updateTimeCounts = () => {
        let isNoActiveExpeditions = true
        console.log(ongoingExpeditions)
        if (!ongoingExpeditions) {
            return
        }
        ongoingExpeditions.forEach( exp => {
                if (exp.status !== ExpeditionStatus.IN_PROGRESS) return 
                let msLeft = exp.endTime - Date.now();
                if (msLeft <= 0) {
                    expeditionsTimeCounts[exp.uuid] = {
                        hours:0,
                        minutes:0,
                        seconds:0
                    }
                    return
                }
                isNoActiveExpeditions = false
                let totalSeconds = Math.floor(msLeft / 1000);

                let hours = Math.floor(totalSeconds / 3600);
                let minutes = Math.floor((totalSeconds % 3600) / 60);
                let seconds = totalSeconds % 60;
                
                expeditionsTimeCounts[exp.uuid] = {
                    hours,
                    minutes,
                    seconds
                }
                
                isNoActiveExpeditions = false
            });
            return isNoActiveExpeditions
        }

    onMount(() => {
        updateTimeCounts()
        const interval = setInterval( () => {
            pageState.loading = false;
            if (!ongoingExpeditions || !ongoingExpeditions.length) {
                return clearInterval(interval)
            }
            let isNoActiveExpeditions = updateTimeCounts()
            if (isNoActiveExpeditions) {
                return clearInterval(interval)
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    const handleExpeditionExpandBtnClick = (expeditionId) => {
        //TODO: use action with server check instead
        goto(`/${pathUUID}/expeditions/${expeditionId}`)
    }

    const setFocusedExpeditionUUID = (expeditionUUID) => {
        chosenExpeditionUUID=expeditionUUID;
    }

</script>

<form id="completeExpedition" method="POST" action="?/completeExpedition" use:enhance>
    <input type="hidden" name="expeditionUUID" value={chosenExpeditionUUID}>
</form>

<form id="archiveExpedition" method="POST" action="?/archiveExpedition" use:enhance>
    <input type="hidden" name="expeditionUUID" value={chosenExpeditionUUID}>
</form>


{#snippet expeditionSlot(expedition)}
    <div transition:slide|global={{delay:100}} class="relative flex flex-col text-sm w-full text-gray-800 space-y-1 hover:text-black items-center justify-center">
        <button 
            class="absolute -top-1.5 right-1 text-gray-800 cursor-pointer text-shadow-2xs hover:text-shadow-md text-shadow-yellow-600 text-xl hover:text-2xl transition-all hover:translate-x-0.5 hover:-translate-y-0.5"
            onclick={()=>handleExpeditionExpandBtnClick(expedition.uuid)}
            in:scale|global={{delay:500}}
            out:scale|global={{duration:100}}
        > 
            📜
        </button>
        <span class="font-bold">{expedition.name}</span>
        <div class="border-t-2 border-gray-800 h-1 w-full"></div>
        <span class="text-gray-800">{expedition.servant.name}</span>
        <span class="text-gray-600">Task: <i>{expedition.task}</i></span>
        <span class="text-gray-600">Approach: <i>{expedition.approach}</i></span>
        <span class="text-gray-600">Scale: <i>{expedition.scale}</i></span>
        {#if  expedition.status === ExpeditionStatus.IN_PROGRESS}
            <button form="completeExpedition" onfocusin={()=>setFocusedExpeditionUUID(expedition.uuid)} onmouseenter={()=>setFocusedExpeditionUUID(expedition.uuid)} type="submit" class="mt-3 bg-green-500 hover:bg-green-400 active:bg-green-300 px-2 py-1 rounded cursor-pointer text-slate-100 font-semibold">Complete</button>
        {:else if expedition.status === ExpeditionStatus.COMPLETED}
            <button form="archiveExpedition" onfocusin={()=>setFocusedExpeditionUUID(expedition.uuid)} onmouseenter={()=>setFocusedExpeditionUUID(expedition.uuid)} type="submit" class="mt-3 bg-orange-600 hover:bg-amber-600 active:bg-yellow-600 px-2 py-1 rounded cursor-pointer text-slate-100 font-semibold">Archive</button>
        {:else if expeditionsTimeCounts[expedition.uuid]}
            <div class="flex flex-row items-center justify-center font-semibold">
                <span class="border w-12 px-2">{expeditionsTimeCounts[expedition.uuid].hours}h</span>:
                <span class="border  w-12 px-2">{expeditionsTimeCounts[expedition.uuid].minutes}m</span>:
                <span class="border  w-12 px-2">{expeditionsTimeCounts[expedition.uuid].seconds}s</span>
            </div>
        {/if}
    </div>
{/snippet}

{#if ongoingExpeditions.length === 0}
    {#if pageState.loading}
        <div class="flex w-full flex-col items-center justify-center ">
            <span class="text-2xl w-full font-bold">Loading ongoing expeditions...</span>
        </div>
    {:else}
        <div transition:slide|global class="flex w-full flex-col items-center justify-center">
            <span class="text-2xl w-full font-bold">No ongoing expeditions</span>
            <span class="text-lg w-full">Start one by choosing a location first!</span>
        </div>
    {/if}
{:else}
    <div class="flex flex-col bg-amber-400/70 border-2 p-5 justify-center space-y-7 items-center w-full">
        {#each ongoingExpeditions as expedition}
            {@render expeditionSlot(expedition)}
        {/each}
    </div>
{/if}
{#if pageState.error}
    <div class="flex w-full flex-col items-center justify-center ">
        <span class="text-2xl w-full font-bold">Error loading expeditions</span>
    </div>
{/if}

