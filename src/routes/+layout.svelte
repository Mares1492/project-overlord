<script>
	import '../app.css';
    import {goto} from '$app/navigation';
	
	let { children } = $props();
</script>

{#snippet btn(icon,path='/')}
    <button class="text-3xl cursor-pointer saturate-75 hover:saturate-200" onclick={()=>goto(path)}>
        {icon}
    </button>
{/snippet}

<div class="w-full h-dvh overflow-y-hidden bg-gray-300">

    <div class="w-full flex flex-row h-full justify-between">
        <div class="min-w-16 ">
            <div class="h-1/2 flex flex-col space-y-5 mt-14 justify-around">
                {@render btn(`🏰`)}
                {@render btn(`⚔️`,'/expeditions')}
                {@render btn(`🧍‍♂️`,'/servants')}
                {@render btn(`🕯️`,'/tomb')}
            </div>
        </div>
            <div class="min-w-64 w-full text-center text-2xl flex flex-col">
                <div class="h-12 mt-3 flex flex-row justify-center space-x-10">
                    <span>💰<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">29175</span></span>
                    <span>💎<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">256</span></span>
                </div>
                <div class="h-full w-full bg-gray-500">
                    {@render children()}
                </div>
            </div>
        <div class="min-w-16">

        </div>
    </div>
</div>
