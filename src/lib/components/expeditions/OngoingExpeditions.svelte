<script>
    import {getOngoingExpeditions,completeExpedition,archiveExpedition } from '$lib/state/expeditionState.svelte.js';
    import {onMount} from 'svelte';
    import {getServantById} from '$lib/state/servants.svelte.js';
   	import { slide } from 'svelte/transition';

    let expeditions = $state([]);
    let pageState = $state({
        loading: true,
        error: null
    });

    onMount(() => {

        const interval = setInterval(() => {
            pageState.loading = false;
            expeditions = getOngoingExpeditions().map( exp => {
                let msLeft = exp.endTime - Date.now();
                if (msLeft <= 0) {
                    completeExpedition(exp.id);
                    return {
                        id: exp.id,
                        name: exp.location.name,
                        servant: getServantById(exp.servantId).name,
                        status: exp.status,
                        hours:0,
                        minutes:0,
                        seconds:0,
                    };
                }
                let totalSeconds = Math.floor(msLeft / 1000);

                let hours = Math.floor(totalSeconds / 3600);
                let minutes = Math.floor((totalSeconds % 3600) / 60);
                let seconds = totalSeconds % 60;
                
            
                return {
                    id: exp.id,
                    name: exp.location.name,
                    servant: getServantById(exp.servantId).name,
                    status: exp.status,
                    hours,
                    minutes,
                    seconds,
                };
                
            });
        }, 1000);
        return () => clearInterval(interval);
    });

</script>

{#snippet expeditionSlot(expedition)}
    <button class="flex flex-col text-sm  text-gray-800 space-y-1 w-32 min-h-24 2xl:w-42 2xl:h-28 cursor-pointer hover:text-black items-center justify-center">
        <span class="font-bold">{expedition.name}</span>
        <div class="border-t-2 border-gray-800 h-1 w-full"></div>
        <span class="text-gray-700">{expedition.servant}</span>  
        <div class="flex flex-row items-center justify-center font-semibold">
            <span class="border w-12 px-2">{expedition.hours}h</span>:
            <span class="border  w-12 px-2">{expedition.minutes}m</span>:
            <span class="border  w-12 px-2">{expedition.seconds}s</span>
        </div>
    </button>
{/snippet}

{#if expeditions.length === 0}
    <div class="flex flex-col items-center justify-center w-full h-full">
        <span class="text-2xl font-bold">No ongoing expeditions</span>
        <span class="text-lg">Start one by choosing a location first!</span>
    </div>
{:else}
    <div class="flex flex-col bg-amber-400/50 border-2 p-5 justify-center space-y-7 items-center w-full h-full">
        {#each expeditions as expedition}
            {@render expeditionSlot(expedition)}
        {/each}
    </div>
{/if}

