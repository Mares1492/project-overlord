<script>
    import servantsTemplate from '$lib/test_data/servants.json';
    import ServantsList from '$lib/components/servants/ServantsList.svelte';
    import {getRaceAssets} from '$lib/state/race.svelte.js';
    import { onMount } from 'svelte'; 
    let servantIndex = $state(0)
    let isChars = $state(true)
    let servants = $state(servantsTemplate);

    onMount(async () => {
        for (let servant of servants) {
            const {face,body} = await getRaceAssets(servant.race);
            servant.iconPath = face;
            servant.bodyPath = body;
        }
    });
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
        <div class="flex w-full flex-col space-y-5 justify-center h-full">
            <div class="flex justify-center">
                {#if isChars}
                    <div class="flex flex-col space-y-5 w-full items-center">
                        <div class="relative grid grid-cols-3 gap-x-3 rounded xl:mx-5 gap-y-3 place-items-center">
                            <ServantsList {servants} bind:servantIndex={servantIndex}/>
                            {@render lockedSlot()}
                            {@render lockedSlot()}
                            {@render lockedSlot()}
                            {@render lockedSlot()}
                            {@render lockedSlot()}
                            {@render lockedSlot()}
                        </div>
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
                    <div class="relative grid grid-cols-5 gap-0.1 place-items-center border-r-2 border-b-2">
                        {#each { length: 30 } as _item,i}
                            {@render inventorySlot(i)}
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="w-1/2 h-full flex flex-row">
        <ul class="h-full flex flex-col justify-center border-4 w-26 2xl:w-36 border-amber-950 bg-orange-950 text-white px-1">
            {#each servants[servantIndex].stats as stat(stat.name)}
                <li class="flex flex-row space-x-2 justify-between">
                    <span class="2xl:text-3xl">{stat.shortName}:</span><span class="font-semibold text-3xl 2xl:text-4xl">{stat.value}</span>
                </li>
            {/each}
        </ul>
        <div class="flex flex-col w-full h-full relative space-y-2">
            <img
                    class={`absolute top-1/2 left-1/2 w-full h-full object-contain transform -translate-x-1/2 -translate-y-1/2 ${servants[servantIndex].vampire?"-hue-rotate-210":""}`}
                    src={servants[servantIndex].bodyPath}
                    alt={`${servants[servantIndex].name}'s body`}
            >
            <div class="w-full flex justify-center">
                <span class="text-base xl:text-xl border-2 border-black bg-gray-800 text-white px-1.5 py-0.5 flex justify-center items-center text-bolt space-x-2">
                    <i>
                        {servants[servantIndex].race}
                        {#if servants[servantIndex].vampire}
                            Vampire
                        {/if}
                    </i>
                    <span>|</span>
                    <span>{servants[servantIndex].name}</span>

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
                <div class="flex justify-between h-full flex-col ">
                    {@render itemSlot(`👤`)}
                    {@render itemSlot(`👘`)}
                    {@render itemSlot(`🖐`)}
                    {@render itemSlot(`🦵`)}
                    {@render itemSlot(`🦶`)}
                </div>
            </div>
        </div>
    </div>
</div>
