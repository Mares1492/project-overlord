<script>
    import {ItemType} from "$lib/enums/enums.js";
    const itemsIcons = import.meta.glob(["$lib/assets/items/armor/*.png","$lib/assets/items/feet/*.png","$lib/assets/items/hands/*.png","$lib/assets/items/head/*.png","$lib/assets/items/legs/*.png","$lib/assets/items/magic_off_hand/*.png","$lib/assets/items/neck/*.png","$lib/assets/items/off_hand/*.png","$lib/assets/items/two_handed_weapon/*.png","$lib/assets/items/weapon/*.png"], {query: '?url' });
    
    const itemTypeDisplayClasses = {
        [ItemType.helmet]: "top-5",
        [ItemType.hood]: "top-3",
        [ItemType.armor]: "-top-5",
        [ItemType.off_hand]: "-left-8 -top-14",
        [ItemType.weapon]: "-top-15 left-3",
        [ItemType.magic_off_hand]: "-top-18 -left-9",
        [ItemType.hands]:"-top-12"
    }

    const {path,name,itemTypeId} = $props()

    /**@param {number} itemType*/
    const getItemDisplayClass = (itemType) => itemTypeDisplayClasses[itemType] ?? "";
</script>

{#await itemsIcons[`/src/lib/assets/items/${path}`]() then src}
    <span class="pointer-events-none">
        <img class={`absolute select-none inset-0 ${getItemDisplayClass(itemTypeId)}`} src={src.default} alt={name} />
    </span>
{:catch _error}
    <p>Error loading image</p>
{/await}
