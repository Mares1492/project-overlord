<script>
    import { getRaceAssets } from '$lib/state/race.svelte.js'
    let {servant,chosenServant=servant,chosenServantUUID=$bindable(),isExpeditionSettings=false} = $props();
    const handleInfoClick = () => {
        // Placeholder for future functionality
        alert(`Servant ${servant.name} info btn is clicked, but panel is not implemented`);
    }
</script>

{#if servant}
    <div class="relative w-32 h-24 2xl:w-42 2xl:h-28">
        {#if isExpeditionSettings}
            <button onclick={handleInfoClick} class="absolute border-slate-200 text-sm border-2 top-1 right-1 rounded-full w-6 h-6 z-10 bg-gray-800  hover:bg-amber-200 active:bg-amber-100 cursor-help">❕</button>
        {/if}
        <button onclick={()=>chosenServantUUID = servant.uuid} class:bg-yellow-100={chosenServant.uuid === servant.uuid}   class="relative z-0 hover:bg-amber-200 cursor-pointer active:bg-amber-100 flex flex-col  items-center justify-center w-full h-full bg-gray-800 border-2">
            {#if isExpeditionSettings}
                <span class:ring-2={chosenServant.uuid === servant.uuid} class="absolute text-xs w-full -top-5 font-semibold border ring-black bg-gray-700  text-slate-200">{servant.name}</span>
            {/if}
            
            {#if servant.status.name !== "idle"}
                <span class="absolute text-xs border-y-2 w-full z-10 top-9 font-semibold  selection:none bg-white">{servant.status.name}</span>
                <img class={`absolute brightness-30 top-0 grayscale-200 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={getRaceAssets(servant.race).face} alt={`servant`}>
            {:else}
                <img class={`absolute top-0 left-0 w-full h-full object-contain ${servant.vampire?"-hue-rotate-210":""}`} src={getRaceAssets(servant.race).face} alt={`servant`}>
            {/if}
        </button>
    </div>
{/if}
