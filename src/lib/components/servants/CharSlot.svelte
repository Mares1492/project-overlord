<script>
    let {servant,i,servantIndex=$bindable(),hasName=false} = $props();
</script>

<button onclick={()=>servantIndex = i} class:bg-yellow-100={servantIndex === i} class:ring-2={servantIndex === i} class="relative hover:bg-amber-200 active:bg-amber-100 cursor-pointer flex flex-col w-32 h-24 2xl:w-42 2xl:h-28 items-center justify-center bg-gray-800 border-2">
    {#if hasName}
        <span class="abosolute top-5 text-lg w-12 h-6 font-semibold bg-gray-700  text-slate-200">{servant.name}</span>
    {/if}
    <img class={`absolute top-0 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={servant.iconPath} alt={`servant`}>
</button>
