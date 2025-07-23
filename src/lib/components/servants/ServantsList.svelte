<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    import { getServants } from "$lib/state/servants.svelte";
    import { getAvailableExpeditionsNumber } from '$lib/state/expeditionState.svelte.js';

    let {chosenServant=$bindable(),isExpedition=false} = $props();
</script>

{#if isExpedition && getAvailableExpeditionsNumber() < 1}
    <span class="text-3xl italic font-medium text-shadow-lg text-shadow-yellow-500">No available servants</span>
{:else}
    {#each getServants() as servant(servant.name)}
        <CharSlot {servant} bind:chosenServant={chosenServant} isExpedition={isExpedition}/>
    {/each}   
{/if}

