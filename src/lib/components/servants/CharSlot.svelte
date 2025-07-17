<script>
    let {servant,i,servantIndex=$bindable(),isExpedition=false} = $props();

    const handleInfoClick = () => {
        // Placeholder for future functionality
        alert(`Servant ${servant.name} info btn is clicked, but panel is not implemented`);
    }
</script>

<div class="relative w-32 h-24 2xl:w-42 2xl:h-28">
    {#if isExpedition}
        <button onclick={handleInfoClick} class="absolute border-slate-200 text-sm border-2 top-1 right-1 rounded-full w-6 h-6 z-10 bg-gray-800  hover:bg-amber-200 active:bg-amber-100 cursor-help">❕</button>
    {/if}
    <button onclick={()=>servantIndex = i} class:bg-yellow-100={servantIndex === i}  class="relative z-0 hover:bg-amber-200 active:bg-amber-100 cursor-pointer flex flex-col  items-center justify-center w-full h-full bg-gray-800 border-2">
        {#if isExpedition}
            <span class:ring-2={servantIndex === i} class="absolute text-xs w-full -top-5 font-semibold border ring-black bg-gray-700  text-slate-200">{servant.name}</span>
        {/if}
        <img class={`absolute top-0 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={servant.iconPath} alt={`servant`}>
    </button>
</div>


