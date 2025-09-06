<script>
    import ItemImg from '$lib/components/inventory/ItemImg.svelte';

    const {inventoryData,handleItemPick=()=>{}} = $props();
    //TODO: move from equip type to weapon types

</script>

{#snippet itemSlot(item)}
    <button type="submit" onfocusin={()=>handleItemPick(item)} onmouseenter={()=>handleItemPick(item)} class="relative flex flex-col  bg-gray-800 active:bg-gray-500 cursor-pointer  hover:text-black hover:bg-gray-600 hover:contrast-120  border-black w-32 h-24 items-center border-l-2 border-t-2  justify-center">
        <ItemImg path={item.iconPath} name={item.name} itemTypeId={item.itemType.id}/>
    </button>
{/snippet}

{#snippet emptySlot(i)}
    <button type="button" onfocusin={()=>handleItemPick(null)} onmouseenter={()=>handleItemPick(null)} class:bg-gray-900={i===inventoryData.availableSlots} class:opacity-90={i>inventoryData.availableSlots} class:opacity-80={i>inventoryData.availableSlots+1} class="flex bg-gray-800 flex-col border-black w-32 h-24 hover:text-black hover:bg-gray-700 items-center border-l-2 border-t-2 justify-center">
        <span class="hidden">{i}</span>
    </button>
{/snippet}

{#snippet lockedSlot(i)}
    {#if i===0}
        <button onfocusin={()=>handleItemPick(null)} onmouseenter={()=>handleItemPick(null)} class="flex active:bg-gray-500 bg-gray-900 opacity-90 flex-col border-black cursor-pointer w-32 h-24 hover:text-black  hover:bg-gray-700  items-center border-l-2 border-t-2  justify-center">
        <span class="flex flex-col text-xl">
            {#if i === 0}
                <span class="text-lg">🔓</span>
                <span class="text-yellow-500">250</span>
            {/if}
        </span>
        </button>
    {:else}
        <button onfocusin={()=>handleItemPick(null)} onmouseenter={()=>handleItemPick(null)} disabled class="flex opacity-80 cursor-not-allowed bg-gray-800 flex-col border-black w-32 h-24 hover:text-black  hover:bg-gray-700  items-center border-l-2 border-t-2  justify-center">
            <span class="flex flex-col text-xl">
                <span class="text-xl text-gray-500 grayscale-90 contrast-10">🔒</span>
            </span>
        </button>
    {/if}
{/snippet}

{#snippet inventorySlot(i,item=null)}
    {#if item}
        {@render itemSlot(item)}
    {/if}
{/snippet}

<div class="flex flex-col h-full w-full items-center justify-center space-y-5">
    <div class="relative grid grid-cols-3 xl:grid-cols-5 max-h-4/5 place-items-center border-r-2 border-b-2 overflow-y-auto overflow-x-hidden ">
        {#each inventoryData.items as item,i}
            {@render inventorySlot(i,item)}
        {/each}
        {#each { length: Math.max(inventoryData.availableSlots-inventoryData.items.length,0) } as _item,i}
            {@render emptySlot(i)}
        {/each}
        {#each { length: inventoryData.maxSlots-inventoryData.availableSlots} as _item,i}
            {@render lockedSlot(i)}
        {/each}
    </div>
</div>

