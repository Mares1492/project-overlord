<script>
    import {invertedItemType} from "$lib/enums/enums.js"

    const itemTypeDisplayClasses = {
        helmet: "top-5",
        armor: "-top-5",
        offHand: "-left-8 -top-14",
        weapon: "-top-15 left-4",
        magicOffHand: "-top-18 -left-9",
        hands:"-top-12"
    }

    const {inventoryData,showCounter=true} = $props();
    //TODO: move from equip type to weapon types

    const itemsIcons = import.meta.glob(["$lib/assets/items/armor/*.png","$lib/assets/items/feet/*.png","$lib/assets/items/hands/*.png","$lib/assets/items/head/*.png","$lib/assets/items/legs/*.png","$lib/assets/items/magic_off_hand/*.png","$lib/assets/items/neck/*.png","$lib/assets/items/off_hand/*.png","$lib/assets/items/two_handed_weapon/*.png","$lib/assets/items/weapon/*.png"], {query: '?url' });

    /**@param {string} type*/
    const getItemDisplayClass = (type) => itemTypeDisplayClasses[invertedItemType[type]] ?? "";

</script>

{#snippet itemImage(src,name,className)}
    <span class="pointer-events-none">
        <img class={`absolute select-none inset-0 ${className}`} {src} alt={name} />
    </span>
{/snippet}

{#snippet itemSlot(item)}
    <input type="hidden" name="itemId" value={item.id}>
    <button class="relative flex flex-col  bg-gray-800  cursor-pointer  hover:text-black hover:bg-gray-600 hover:contrast-120  border-black w-32 h-24 items-center border-l-2 border-t-2  justify-center">
        {#await itemsIcons[`/src/lib/assets/items/${item.iconPath}`]() then module}
            {@render itemImage(module.default,item.name,getItemDisplayClass(item.type))}
        {:catch _error}
            <p>Error loading image</p>
        {/await}
    </button>
{/snippet}

{#snippet emptySlot(i)}
    <div class={`${i>9?i===10?'bg-gray-900':'bg-gray-800/70':'bg-gray-800'} flex flex-col border-black cursor-pointer w-32 h-24 hover:text-black  hover:bg-gray-700  items-center border-l-2 border-t-2  justify-center`}>
        <span class="flex flex-col text-xl">
            {#if i===10}
                <span class="text-lg">🔓</span>
                <span class="text-yellow-500">250</span>
            {:else if  i>10}
                <span class="text-xl text-gray-500 grayscale-90 contrast-10">🔒</span>
            {/if}
        </span>
    </div>
{/snippet}

{#snippet inventorySlot(i,item=null)}
    {#if item}
        {@render itemSlot(item)}
    {:else}
        {@render emptySlot(i)}
    {/if}
{/snippet}

<div class="flex flex-col h-full w-full items-center justify-center space-y-5">
    {#if showCounter}
        <span class="bg-black/70 p-3 text-white font-bold text-4xl">
            {inventoryData.items.length}/{inventoryData.unlockedSlots}
        </span>
    {/if}
    <div class="relative grid grid-cols-3 xl:grid-cols-5 max-h-4/5  place-items-center border-r-2 border-b-2 overflow-y-auto overflow-x-hidden ">
        {#each inventoryData.items as item,i}
            {@render inventorySlot(i,item)}
        {/each}
        {#each { length: inventoryData.maxSlots-inventoryData.items.length } as _item,i}
            {@render inventorySlot(i)}
        {/each}
    </div>
</div>

