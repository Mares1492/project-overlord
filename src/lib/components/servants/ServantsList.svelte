<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    import {ServantStatus} from '$lib/enums/enums'

    let {servants, chosenServant=$bindable(),isExpeditionSettings=false} = $props();
</script>

{#if servants}
    {#if servants.length === 0}
        <span class="text-3xl italic font-medium text-shadow-sm text-shadow-yellow-500">No available servants</span>
    {:else}
        {#each servants as servant(servant.uuid)}
            {#if !isExpeditionSettings || servant.status.id === ServantStatus.idle}
                <CharSlot {servant} bind:chosenServant={chosenServant} isExpeditionSettings={isExpeditionSettings}/>  
            {/if}
        {/each}   
    {/if}
{/if}

