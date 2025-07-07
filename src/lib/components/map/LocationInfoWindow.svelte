<script>
	import { getContext } from 'svelte';

  	const chooseLocation = getContext('chooseLocation');
	let {position, location = $bindable()} = $props()
	//TODO: handle location click
</script>

{#if location !== null}
	<div
		class="absolute z-50 p-4 rounded-sm bg-white border border-gray-300 text-sm max-w-sm"
		style={`left: ${position.x}px; top: ${position.y}px`}
	>
		<button
			onclick={()=>location = null}
			class="m-0.2 text-xl absolute right-2.5 top-0.5 text-gray-500 cursor-pointer hover:font-bold"
		>
			X
		</button>
		<h3 class="font-bold text-lg mb-1">{location.name}</h3>
		<p class="text-gray-600 mb-2">{location.description}</p>
		<p class="text-xs text-gray-400">Importance: {location.importance}</p>
	</div>
{/if}
