<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    import { getServants } from "$lib/state/servants.svelte";
    import { getAvailableExpeditionsNumber } from '$lib/state/expeditionState.svelte.js';
    import {ServantStatus} from '$lib/enums/enums'

    let {chosenServant=$bindable(),isExpeditionSettings=false} = $props();
</script>

{#if isExpeditionSettings && getAvailableExpeditionsNumber() < 1 || getServants().length === 0}
    <span class="text-3xl italic font-medium text-shadow-sm text-shadow-yellow-500">No available servants</span>
{:else}
    {#each getServants() as servant(servant.uuid)}
        {#if isExpeditionSettings && servant.status.id === ServantStatus.IDLE}
            <CharSlot {servant} bind:chosenServant={chosenServant} isExpeditionSettings={isExpeditionSettings}/>  
        {/if}
    {/each}   
{/if}

