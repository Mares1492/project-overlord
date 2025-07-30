{#snippet inventorySlot(i)}
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

<div class="relative grid grid-cols-5 gap-0.1 place-items-center border-r-2 border-b-2">
    {#each { length: 30 } as _item,i}
        {@render inventorySlot(i)}
    {/each}
</div>
