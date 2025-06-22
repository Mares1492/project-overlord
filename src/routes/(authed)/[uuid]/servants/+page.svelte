<script>
    import humanFace from '$lib/assets/characters/human/face.webp'
    import humanBody from '$lib/assets/characters/human/body.webp'
    const servants = [
        {
            race: "Human",
            iconPath: humanFace,
            bodyPath: humanBody,
            name: "Servantus Vantus",
            vampire: false,
            stats:[{name:"agility",shortName:"Agi",value:2},{name:"strength",shortName:"Str",value:2},{name:"dexterity",shortName:"Dex",value:1},{name:"intellect",shortName:"Int",value:1}]
        },
        {
            race: "Human",
            iconPath: humanFace,
            bodyPath: humanBody,
            name: "Sirrus Sirius",
            vampire: false,
            stats:[{name:"agility",shortName:"Agi",value:1},{name:"strength",shortName:"Str",value:5},{name:"dexterity",shortName:"Dex",value:1},{name:"intellect",shortName:"Int",value:5}]
        },
        {
            race: "Human",
            iconPath: humanFace,
            bodyPath: humanBody,
            name: "Servantus Dominus",
            vampire: true,
            stats:[{name:"agility",shortName:"Agi",value:3},{name:"strength",shortName:"Str",value:5},{name:"dexterity",shortName:"Dex",value:3},{name:"intellect",shortName:"Int",value:1}]
        }
    ]

    let servantIndex = $state(0)
    let isChars = $state(true)

</script>

{#snippet lockedSlot()}
    <div class="relative flex flex-col w-32 h-24 2xl:w-42 2xl:h-28 cursor-not-allowed hover:text-black items-center border-2 justify-center bg-gray-800">
        <span class="text-4xl xl:text-4xl grayscale-50 saturate-125">🔒</span>
    </div>
{/snippet}

{#snippet premiumLockedSlot()}
    <span class="relative hover:font-bold flex flex-col w-32 h-24 xl:w-42 xl:h-28 cursor-pointer hue-saturate-210 hover:text-black hover:bg-amber-100 items-center border-2 justify-center bg-gray-900">
        <span class="text-2xl xl:text-4xl hue-rotate-200">🔒</span>
        <span class="text-2xl xl:text-3xl text-purple-300">100</span>
    </span>
{/snippet}


{#snippet itemSlot(item)}
    <div class="flex flex-col w-28 h-16 xl:w-42 xl:h-28 cursor-pointer hover:text-black hover:bg-amber-100 items-center border-2 justify-center bg-gray-800">
        <span class="text-3xl xl:text-4xl grayscale-90 contrast-10">{item}</span>
    </div>
{/snippet}

{#snippet inventorySlot(i)}
    <div class="flex flex-col cursor-pointer w-22 h-16 xl:w-36 xl:h-28 hover:text-black hover:bg-amber-100  items-center border-2 justify-center bg-gray-800">
        <span class="text-3xl xl:text-4xl grayscale-90 contrast-10">~{i}</span>
    </div>
{/snippet}

<div class="w-full h-full flex flex-row justify-center bg-amber-900/50 p-5">
    <div class="flex w-1/2 flex-row space-x-5 space-y-5">
        <div class="flex w-full flex-col space-y-5">
            <div class="flex flex-row justify-center font-bold space-x-5">
                <button class:bg-green-400={isChars} onclick={()=>isChars = true} class="border hover:bg-amber-200 px-1 w-20 py-0.5 bg-gray-600 cursor-pointer">Chars</button>
                <button class:bg-green-400={!isChars} onclick={()=>isChars = false} class="border hover:bg-amber-200 px-1 w-20 py-0.5 bg-gray-600 cursor-pointer">Items</button>
            </div>
            <div class="h-full self-center">
                {#if isChars}
                    <div class="relative grid grid-cols-3 gap-x-3 rounded xl:mx-5 gap-y-3 place-items-center">
                        {#each servants as servant,i(servant.name)}
                            <button onclick={()=>servantIndex = i} class="relative hover:bg-amber-100 cursor-pointer border flex flex-col w-32 h-24 xl:w-42 xl:h-28 items-center justify-center bg-gray-800 border-2">
                                <img class={`absolute top-0 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={servant.iconPath} alt={`servant`}>
                            </button>
                        {/each}
                        {@render lockedSlot()}
                        {@render lockedSlot()}
                        {@render lockedSlot()}
                        {@render premiumLockedSlot()}
                        {@render premiumLockedSlot()}
                        {@render premiumLockedSlot()}
                    </div>
                {:else}
                    <div>
                        <div class="relative grid grid-cols-5 rounded place-items-center">
                            {#each { length: 30 } as _item,i}
                                {@render inventorySlot(i)}
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <ul class="h-full w-32 flex flex-col justify-center border-4 border-amber-950 bg-orange-950 text-white">
            {#each servants[servantIndex].stats as stat(stat.name)}
                <li>
                    {stat.shortName}: {stat.value}
                </li>
            {/each}
        </ul>
    </div>
    <div class="w-1/2 h-full">
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
            <div class="w-full h-4/5 flex justify-around space-x-8  flex-row">
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
