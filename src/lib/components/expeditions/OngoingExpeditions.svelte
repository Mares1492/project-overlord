<script>
    import {getOngoingExpeditions} from '$lib/state/expeditionState.svelte.js';
    console.log(getOngoingExpeditions());
</script>

{#snippet expeditionSlot(expedition)}
    <button class="flex flex-col text-sm  text-gray-800 space-y-1 w-32 min-h-24 2xl:w-42 2xl:h-28 cursor-pointer hover:text-black items-center justify-center">
        <span class="font-bold">{expedition.location.name}</span>
        <div class="border-t-2 border-gray-800 h-1 w-full"></div>
        <span class="">{expedition.endTime}</span>
    </button>
{/snippet}

{#if expeditions.length === 0}
    <div class="flex flex-col items-center justify-center w-full h-full">
        <span class="text-2xl font-bold">No ongoing expeditions</span>
        <span class="text-lg">Start one in the Expeditions tab!</span>
    </div>
{:else}
    <div class="flex flex-col bg-amber-400/50 border-2 p-5 justify-center space-y-7 items-center w-full h-full">
        {#each expeditions as expedition}
            {@render expeditionSlot(expedition)}
        {/each}
    </div>
{/if}

