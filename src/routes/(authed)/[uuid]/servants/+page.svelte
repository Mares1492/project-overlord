<script>
    import ServantsList from '$lib/components/servants/ServantsList.svelte';
    import Inventory from '$lib/components/inventory/Inventory.svelte';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { getRaceAssets } from '$lib/state/race.svelte.js'
    import ItemInfoWindow from '$lib/components/servants/ItemInfoWindow.svelte';
    
    const {data} = $props();

    let chosenServant = $state();
    let isChars = $state(true);
    let mousePosition = $state({x:0,y:0})
    let chosenItem = $state()
    let showItemInfoWindow = $state(false)
    let itemWindowTimeout;
    let errorState = $state({
        error: data.error,
        message: data.message
    });

    onMount(async () => {
        if (data.servants && data.servants.length > 0) {
            chosenServant = data.servants[0];
        }
    });

    const setItemWindowShowTimeout = (e) => {
        cancelItemWindowShowTimeout()
        mousePosition.x = e.clientX - 50
        mousePosition.y = e.clientY -50
        itemWindowTimeout = setTimeout(()=>showItemInfoWindow=true,500)
    }

    const cancelItemWindowShowTimeout = () => {
        if (itemWindowTimeout) {
            clearTimeout(itemWindowTimeout)
        }
        showItemInfoWindow = false
    }

    const handleItemPick = (item) => {chosenItem = item}

</script>

{#snippet lockedSlot()}
    <div class="relative flex flex-col w-32 h-24 2xl:w-42 2xl:h-28 h cursor-not-allowed hover:text-black items-center border-2 justify-center bg-gray-800">
        <span class="text-4xl xl:text-4xl grayscale-50 saturate-125">🔒</span>
    </div>
{/snippet}

{#snippet itemSlot(item)}
    <div class="flex flex-col w-28 h-16 xl:w-42 xl:h-28 cursor-pointer hover:text-black hover:bg-amber-100 items-center border-2 justify-center bg-gray-800">
        <span class="text-3xl xl:text-4xl grayscale-90 contrast-10">{item}</span>
    </div>
{/snippet}

<div class="w-full h-full flex flex-row justify-center bg-amber-900/50 p-5">
    <div class="flex w-1/2 h-full flex-col space-x-5 space-y-5">
        <div class="flex flex-row justify-center font-bold space-x-5 xl:text-4xl">
            <button
                    class:bg-green-400={isChars}
                    onclick={()=>isChars = true}
                    class="border hover:bg-amber-200 px-1 w-20 xl:w-32 py-0.5 bg-gray-600 cursor-pointer">
                Chars
            </button>
            <button
                    class:bg-green-400={!isChars}
                    onclick={()=>isChars = false}
                    class="border hover:bg-amber-200 px-1 w-20 xl:w-32 py-0.5 bg-gray-600 cursor-pointer">
                Items
            </button>
        </div>
        {#if errorState.error}
            <div class="w-full p-2 bg-red-600 text-white text-center font-bold border-2 border-black">
                {errorState.message}
            </div>
        {/if}
        <div class="flex w-full flex-col space-y-5 justify-center h-full">
            <div class="flex justify-center h-full items-center">
                {#if isChars}
                    <div class="flex flex-col space-y-5 w-full items-center">
                        {#if data.servants && chosenServant}
                            <div class="relative grid grid-cols-3 gap-x-3 rounded xl:mx-5 gap-y-3 place-items-center">
                                <ServantsList servants={data.servants} bind:chosenServant={chosenServant}/>
                                {@render lockedSlot()}
                                {@render lockedSlot()}
                                {@render lockedSlot()}
                                {@render lockedSlot()}
                                {@render lockedSlot()}
                                {@render lockedSlot()}
                            </div>
                        {/if}
                        <div class="flex flex-row justify-center font-bold space-x-5">
                            <button
                                    class="border py-1.5 px-5 w-32 2xl:w-42 flex flex-col justify-around text-yellow-500 hover:bg-amber-200 active:bg-amber-100 bg-gray-600 cursor-pointer"
                                    onclick={()=>{}}
                            >
                                <span>Unlock</span>
                                <span class="text-xl 2xl:text-3xl grayscale-50 saturate-125">🔓</span>
                                <span class="text-xl 2xl:text-2xl ">💰1000</span>
                            </button>
                            <button
                                    class="border py-1.5 px-2 w-32 2xl:w-42 flex flex-col text-purple-300 justify-around hover:bg-amber-200 active:bg-amber-100 bg-gray-600 cursor-pointer"
                                    onclick={()=>{}}
                            >
                                <span>Unlock</span>
                                <span class="text-xl 2xl:text-3xl hue-rotate-200">🔓</span>
                                <span class="text-xl 2xl:text-2xl"><span class="hue-rotate-50">💎</span>100</span>
                            </button>
                        </div>
                    </div>
                {:else}
                    <div class="flex flex-col space-y-2">
                        <span class="bg-black/70 p-3 text-white font-bold text-4xl">
                            {data.inventory.items.length}/{data.inventory.unlockedSlots}
                        </span>
                        <form onmouseleave={cancelItemWindowShowTimeout} use:enhance method="POST" action="?/equipItem">
                            <input type="hidden" name="servantId" value={chosenServant.uuid}>           
                            {#if showItemInfoWindow && chosenItem}
                                <ItemInfoWindow position={mousePosition} item={chosenItem}/>
                            {/if}
                            <span onmousemove={setItemWindowShowTimeout}>
                                <Inventory inventoryData={data.inventory} {chosenItem} {handleItemPick}/>
                            </span>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="w-1/2 h-full flex flex-row">
        {#if chosenServant}
            <ul class="h-full flex flex-col justify-center space-y-2 border-4 border-amber-950 bg-orange-950 text-white w-38 px-5">
                {#each chosenServant.attributes as attribute(attribute.name)}
                    <li class="flex flex-row space-x-2 justify-between items-end">
                        <span class="text-xl 2xl:text-2xl">{attribute.shortName}:</span><span class="font-semibold text-2xl 2xl:text-3xl">{attribute.value}</span>
                    </li>
                {/each}
            </ul>
            <div class="flex flex-col w-full h-full relative space-y-2">
                {#await getRaceAssets(chosenServant.race)}
                    <span>Loading...</span>
                {:then src}
                    <img
                        class={`absolute top-1/2 left-1/2 w-full h-full object-contain transform -translate-x-1/2 -translate-y-1/2 ${chosenServant.vampire?"-hue-rotate-210":""}`}
                        src={src.body}
                        alt={`${chosenServant.name}'s body`}
                    >
                {/await}
                <div class="w-full h-9 px-1  flex justify-center">
                    <span class="text-base xl:text-xl border-2 border-black bg-gray-800 text-white px-1.5 py-0.5 flex justify-center items-center text-bolt space-x-2">
                        <i>
                            {chosenServant.race.charAt(0).toUpperCase() + chosenServant.race.slice(1)}
                            {#if chosenServant.vampire}
                                Vampire
                            {/if}
                        </i>
                        <span>|</span>
                        <span>{chosenServant.name}</span>

                    </span>
                </div>
                <div class="w-full h-4/5 flex z-5 justify-around space-x-8  flex-row">
                    <div class="h-full flex flex-col justify-center">
                        <div class="h-1/2 self-start">
                            {@render itemSlot(`📿`)}
                        </div>
                        <div class="self-end space-y-5">
                            {@render itemSlot(`🗡️`)}
                            {@render itemSlot(`🛡️`)}
                        </div>
                    </div>
                    <div class="flex justify-center space-y-8 h-full flex-col ">
                        {@render itemSlot(`👤`)}
                        {@render itemSlot(`👘`)}
                        {@render itemSlot(`🖐`)}
                        {@render itemSlot(`🦵`)}
                        {@render itemSlot(`🦶`)}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
