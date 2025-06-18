<script>
    import keep from '$lib/assets/icons/keep/keep.webp'
    import barracks from '$lib/assets/icons/keep/barracks.webp'
    import arsenal from '$lib/assets/icons/keep/arsenal.webp'
    import tomb from '$lib/assets/icons/keep/tomb.webp'
    import treasury from '$lib/assets/icons/keep/treasury.webp'
    import academy from '$lib/assets/icons/keep/academy.webp'
    import {goto} from "$app/navigation";

    const hubAttrTemp = [
        {name:"Keep",lvl:5,basePrice:10000,iconPath:keep,pathTo:"keep"},
        {name:"Barracks",lvl:2,basePrice:500,iconPath:barracks,pathTo:"barracks"},
        {name:"Treasury",lvl:4,basePrice:500,iconPath:treasury,pathTo:"treasury"},
        {name:"Arsenal",lvl:2,basePrice:500,iconPath:arsenal,pathTo:"arsenal"},
        {name:"Academy",lvl:0,basePrice: 5000,iconPath:academy,pathTo:"academy"},
        {name:"Tomb",lvl:2,basePrice: 100,iconPath:tomb,pathTo:"tomb"}
    ]

    let {data} = $props();

</script>
<div class="relative h-full w-full flex">
    <div class="w-full grid grid-cols-3 gap-x-5 gap-y-20 px-8 pt-5 place-items-center">
        {#each hubAttrTemp as building(building.name)}
            <div class={`relative border-2 rounded-xl w-38 h-38 xl:w-48 xl:h-48 text-lg xl:text-xl text-white backdrop-opacity-50 justify-center border-black flex flex-col bg-[url(${building.iconPath})] ${building.iconPath.length === 0?"bg-black/70":"bg-black"}`}>
                <img class="absolute rounded-xl top-0 left-0 w-full h-full object-cover -z-1" src={building.iconPath} alt={building.name}>
                <button onclick={()=>goto(`/${data.pathUUID}/${building.pathTo}`)} class="h-1/2 rounded-t-xl cursor-pointer hover:bg-amber-100 hover:text-gray-800 hover:font-extrabold flex items-center justify-center flex-col space-y-1.5">
                    {building.name}
                </button>
                <button onclick={()=>console.log(building.name)} class="h-1/2 flex flex-col rounded-b-xl cursor-pointer hover:bg-amber-100 bg-amber-50 text-gray-800 font-extrabold border-t-2 border-black flex items-center justify-center">
                    <span>lvl: {building.lvl}</span>
                    Upgrade: {building.basePrice * (building.lvl+1)}
                </button>
            </div>
        {/each}
    </div>
    <div>

    </div>
</div>