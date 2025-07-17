<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    let {servants,servantIndex=$bindable(),isExpedition=false} = $props();
</script>


{#each servants as servant,i(servant.name)}
    <CharSlot {servant} {i} bind:servantIndex={servantIndex} isExpedition={isExpedition}/>
{/each}
