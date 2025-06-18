<script>
    import humanFace from '$lib/assets/characters/human/face.webp'
    const servantSlots = [
        {
            iconPath: humanFace,
            name: "servant 1",
            vampire: false
        },
        {
            iconPath: humanFace,
            name: "servant 2",
            vampire: false
        },
        {
            iconPath: humanFace,
            name: "servant 3",
            vampire: true
        }
    ]
    const updates = [
        {name:"shooting range",lvl:2,updateBase:250,icon:`🎯`},
        {name:"training yard",lvl:2,updateBase:250,icon:`💪`},
        {name:"beds",lvl:2,updateBase:250,icon:`🛏️`},
    ]

</script>

{#snippet lockedSlot()}
    <div class="relative flex flex-col w-32 h-20 xl:w-42 xl:h-28 cursor-pointer hover:text-black hover:bg-white items-center border-2 justify-center bg-gray-800">
        <span class="text-2xl xl:text-4xl grayscale-50 saturate-125">🔒</span>
        <span class="text-2xl xl:text-3xl text-yellow-500">1000</span>
    </div>
{/snippet}

<div class="w-full flex flex-row pt-7 ">
    <div class="relative grid grid-cols-3 gap-x-5 gap-y-15 w-1/2  place-items-center">
        {#each servantSlots as servant(servant.name)}
            <button class="relative hover:bg-white cursor-pointer border flex flex-col w-32 h-20 xl:w-42 xl:h-28 items-center justify-center bg-gray-800 border-2">
                <img class={`absolute top-0 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={servant.iconPath} alt={`servant`}>
            </button>
        {/each}
        {@render lockedSlot()}
        {@render lockedSlot()}
        {@render lockedSlot()}

    </div>
    <div class="grid grid-cols-3 w-1/2 place-items-center">
        {#each updates as update(update.name)}
            <button class="hover:bg-white cursor-pointer border hover:text-black text-white flex flex-col w-32 h-20 xl:w-42 xl:h-28  items-center justify-center bg-gray-800 border-2">
                <span class="text-lg xl:text-2xl grayscale-50 saturate-125">Lvl: {update.lvl}</span>
                <span class="text-3xl xl:text-4xl grayscale-50 saturate-125 text-center">{update.icon}</span>
                <span class="text-lg xl:text-xl text-yellow-500">{update.updateBase*update.lvl}</span>
            </button>
        {/each}
    </div>
</div>
