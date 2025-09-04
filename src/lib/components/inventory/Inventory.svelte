<script>
    import {ItemType} from "$lib/enums/enums.js"

    const itemTypeDisplayClasses = {
        [ItemType.helmet]: "top-5",
        [ItemType.hood]: "top-3",
        [ItemType.armor]: "-top-5",
        [ItemType.off_hand]: "-left-8 -top-14",
        [ItemType.weapon]: "-top-15 left-3",
        [ItemType.magic_off_hand]: "-top-18 -left-9",
        [ItemType.hands]:"-top-12"
    }

    const {inventoryData,handleItemPick=()=>{}} = $props();
    //TODO: move from equip type to weapon types
    const itemsIcons = import.meta.glob(["$lib/assets/items/armor/*.png","$lib/assets/items/feet/*.png","$lib/assets/items/hands/*.png","$lib/assets/items/head/*.png","$lib/assets/items/legs/*.png","$lib/assets/items/magic_off_hand/*.png","$lib/assets/items/neck/*.png","$lib/assets/items/off_hand/*.png","$lib/assets/items/two_handed_weapon/*.png","$lib/assets/items/weapon/*.png"], {query: '?url' });

    /**@param {number} itemType*/
    const getItemDisplayClass = (itemType) => itemTypeDisplayClasses[itemType] ?? "";

</script>

{#snippet itemImage(src,name,className)}
    <span class="pointer-events-none">
        <img class={`absolute select-none inset-0 ${className}`} {src} alt={name} />
    </span>
{/snippet}

{#snippet itemSlot(item)}
    <button type="submit" onfocusin={()=>handleItemPick(item)} onmouseenter={()=>handleItemPick(item)} class="relative flex flex-col  bg-gray-800 active:bg-gray-500 cursor-pointer  hover:text-black hover:bg-gray-600 hover:contrast-120  border-black w-32 h-24 items-center border-l-2 border-t-2  justify-center">
        {#await itemsIcons[`/src/lib/assets/items/${item.iconPath}`]() then module}
            {@render itemImage(module.default,item.name,getItemDisplayClass(item.itemType.id))}
        {:catch _error}
            <p>Error loading image</p>
        {/await}
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

