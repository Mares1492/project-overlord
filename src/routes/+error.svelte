<script>
    import '../app.css'
    import {goto} from "$app/navigation";
    import LoadingIcon from '$lib/components/display/LoadingIcon.svelte';
    let isLoading = $state(false)
</script>

<div class="w-full h-screen flex justify-center items-center bg-[url($lib/assets/bg/pages/not_found.png)] text-white text-4xl">
    <div class="flex items-center w-62 py-5 px-5 text-center bg-gray-500/50 flex-col h-38 space-y-3.5">
        <span >Not found</span>
        {#if isLoading}
            <LoadingIcon/>
        {:else}
            <button class="bg-black text-2xl py-2 px-4 cursor-pointer hover:bg-gray-900 active:bg-gray-500 rounded" onclick={()=>{isLoading=true;goto('/')}}>
                Home
            </button>
        {/if}
    </div>
</div>
