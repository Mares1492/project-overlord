<script>
    const updates = [
        {name:"Beds",lvl:3,updateBase:100,icon:`🛏️`},
        {name:"Training Yard",lvl:1,updateBase:250,icon:`💪`},
        {name:"Shooting range",lvl:2,updateBase:250,icon:`🏹🎯`},
        {name:"Meditation Room",lvl:0,updateBase:250,icon:`🧘‍♂️`},
        {name:"Dining Room",lvl:0,updateBase:250,icon:`🍽️`},
        {name:"Sparring Hall",lvl:0,updateBase:250,icon:`🤺`},
        {name:"Infirmary Nook",lvl:0,updateBase:250,icon:`❤️‍🩹`},
        {name:"War Room",lvl:0,updateBase:1000,icon:`🐉️`},
        {name:"Night Training Grounds",lvl:0,updateBase:250,icon:`🐱‍👤`},
        {name:"Library",lvl:0,updateBase:2500,icon:`📚`},
        {name:"Blacksmith's Annex",lvl:0,updateBase:1000,icon:`🛡️`},
        {name:"Warcaster`s Hall",lvl:0,updateBase:10000,icon:`🧙🏻`},

    ]
</script>

<div class="grid h-full p-5 grid-cols-4 gap-x-5 bg-amber-900/50 place-items-center">
    {#each updates as update(update.name)}
        <div class="flex flex-col items-center">
            <span class="text-white text-lg">{update.name}</span>
            <button class="hover:bg-amber-100 cursor-pointer border-black hover:text-black hover:font-bold text-white flex flex-col w-32 h-24 xl:w-42 xl:h-28 justify-around bg-gray-800 border-2">
                <span class="xl:text-lg text-base grayscale-50 saturate-125">Lvl: {update.lvl}</span>
                <span class="text-3xl xl:text-4xl grayscale-50 saturate-125 text-center">{update.icon}</span>
                <span class="text-lg xl:text-xl text-yellow-500">{update.updateBase*(update.lvl+1)}</span>
            </button>
        </div>
    {/each}
</div>
