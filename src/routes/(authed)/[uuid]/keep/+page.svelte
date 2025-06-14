<script>
    const hubAttrTemp = [
        {name:"Keep",lvl:5,basePrice:10000},
        {name:"Barracks",lvl:2,basePrice:500},
        {name:"Treasury",lvl:4,basePrice:500},
        {name:"Arsenal",lvl:2,basePrice:500},
        {name:"Academy",lvl:0,basePrice: 5000},
        {name:"Tomb",lvl:2,basePrice: 100}
    ]
</script>

<div class="h-full w-full bg-gray-900 bg-top bg-contain bg-no-repeat bg-local  bg-[url($lib/assets/bg/keep/castle.png)]">
    <div class="flex flex-col space-y-5 pt-5">
        {#each hubAttrTemp as building(building.name)}
            <button onclick={()=>console.log(building.name)} class="w-30 h-30 border-2 text-xl ml-5 cursor-pointer hover:bg-amber-50 hover:text-gray-800 hover:font-extrabold text-white bg-gray-500/70 backdrop-opacity-50 justify-center border-black flex flex-col">
                <span>{building.name}</span>
                <span>lvl: {building.lvl}</span>
                <span class="border-t-2">upgrade: {building.basePrice * (building.lvl+1)}</span>
            </button>
        {/each}
    </div>
</div>