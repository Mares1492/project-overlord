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
    let isItems = $state(true)

</script>

{#snippet lockedSlot()}
    <div class="relative  hover:font-bold flex flex-col w-32 h-24 xl:w-42 xl:h-28 cursor-pointer hover:text-black hover:bg-amber-100 items-center border-2 justify-center bg-gray-800">
        <span class="text-2xl xl:text-4xl grayscale-50 saturate-125">🔒</span>
        <span class="text-2xl xl:text-3xl text-yellow-500">1000</span>
    </div>
{/snippet}

{#snippet premiumLockedSlot()}
    <span class="relative hover:font-bold flex flex-col w-32 h-24 xl:w-42 xl:h-28 cursor-pointer hue-saturate-210 hover:text-black hover:bg-amber-100 items-center border-2 justify-center bg-gray-900">
        <span class="text-2xl xl:text-4xl hue-rotate-200">🔒</span>
        <span class="text-2xl xl:text-3xl text-purple-300">100</span>
    </span>
{/snippet}

