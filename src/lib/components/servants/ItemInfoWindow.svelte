<script>
    import { fade } from 'svelte/transition';
	let {item,position} = $props()
</script>

{#if item}
	<div  
        in:fade|global={{duration:200}}
		class="absolute z-50 w-64 h-max-42 overflow-auto p-4 rounded-sm bg-black/80 border border-gray-300 text-sm max-w-sm"
		style={`left: ${position.x}px; top: ${position.y}px`}
	>
		<div class="flex flex-col space-y-3 mb-2.5  text-slate-300">
			<h3 class="font-bold text-slate-100 text-base ">{item.name}<br><span>{item.is_base?" (your base)":""}</span></h3>
            <button type="submit" class="rounded cursor-pointer font-bold text-gray-800 hover:bg-slate-200 bg-slate-300 active:bg-slate-500 py-1">Equip</button>
            <span class="text-sm">Slot: <span class="tracking-widest font-bold">{item.slotType.name}</span></span>
            <span class="text-sm">Rarity: <span style={`color:${item.rarity.color}`} class="tracking-widest font-bold">{item.rarity.name.toUpperCase()}</span></span>
            <div class="w-full bg-slate-100 h-0.5"></div>
            <ul class="list-none">
                {#each item.attributes as attribute(attribute.name)}
                     <li class="tracking-widest">{attribute.name} : {attribute.value}</li>
                {/each}
            </ul>
            <div class="w-full bg-slate-100 h-0.5"></div>
            <span class=" text-slate-100 text-sm">{item.description}</span>
        </div>
    </div>
{/if}
