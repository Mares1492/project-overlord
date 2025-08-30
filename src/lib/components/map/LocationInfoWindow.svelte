<script>
	import { getContext } from 'svelte';

  	const chooseLocation = getContext('chooseLocation');
	let {position, location = $bindable()} = $props()
</script>

{#if location !== null}
	<div  
		class="absolute z-50 w-64 p-4 rounded-sm bg-white border border-gray-300 text-sm max-w-sm"
		style={`left: ${position.x}px; top: ${position.y}px`}
	>
		<button
			onclick={()=>location = null}
			class="m-0.2 text-xl absolute right-2.5 top-0.5 text-gray-500 cursor-pointer hover:font-bold"
		>
			X
		</button>
		<div class="flex flex-col space-y-1 mb-3.5">
			<h3 class="font-bold text-lg mb-1">{location.name}<br><span>{location.is_base?" (your base)":""}</span></h3>
			<span class="text-xs text-gray-400">Type: {location.type.name}</span>
			<span class="text-gray-600 mb-2">{location.description}</span>
			<span class="text-xs text-gray-400">Difficulty: {location.importance}</span>
		</div>
		<button onclick={()=>chooseLocation(location)} class="text-base border-gray-400 font-semibold cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-50 border px-1 py-0.5">Choose</button>
	</div>
{/if}
