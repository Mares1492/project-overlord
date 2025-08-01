<script>
    const {inventoryData} = $props();
    const itemTypeDisplayClasses = ["top-5","-top-5","","","","left-5 -bottom-9","","right-8 -bottom-10","-top-1"]

    const itemsIcons = import.meta.glob(["$lib/assets/items/armor/*.png","$lib/assets/items/feet/*.png","$lib/assets/items/hands/*.png","$lib/assets/items/head/*.png","$lib/assets/items/legs/*.png","$lib/assets/items/magic_off_hand/*.png","$lib/assets/items/neck/*.png","$lib/assets/items/off_hand/*.png","$lib/assets/items/two_handed_weapon/*.png","$lib/assets/items/weapon/*.png"], {query: '?url' });

</script>

{#snippet itemSlot(item)}
        <div class="relative flex flex-col border-black cursor-pointer w-20 h-16 2xl:w-36 2xl:h-28 hover:text-black hover:bg-amber-100  items-center border-l-2 border-t-2  justify-center bg-gray-800">
            {#await itemsIcons[`/src/lib/assets/items/${item.iconPath}`]() then module}
                <img class="absolute -top-3" src={module.default} alt={item.name} />
            {:catch _error}
                <p>Error loading image</p>
            {/await}
        </div>
{/snippet}

{#snippet emptySlot(i)}
    <div class={`${i>9?i===10?'bg-gray-900':'bg-gray-800/70':'bg-gray-800'} flex flex-col border-black cursor-pointer w-20 h-16 2xl:w-36 2xl:h-28 hover:text-black hover:bg-amber-100  items-center border-l-2 border-t-2  justify-center`}>
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

<div class="flex flex-col w-full h-full items-center justify-center space-y-5">
    <span class="bg-black/70 p-3 text-white font-bold text-4xl">
        {inventoryData.items.length}/{inventoryData.unlockedSlots}
    </span>
    <div class="relative grid grid-cols-5 gap-0.1 place-items-center border-r-2 border-b-2">
        {#each inventoryData.items as item,i}
            {@render inventorySlot(i,item)}
        {/each}
        {#each { length: inventoryData.maxSlots-inventoryData.items.length } as _item,i}
            {@render inventorySlot(i)}
        {/each}
    </div>
</div>

