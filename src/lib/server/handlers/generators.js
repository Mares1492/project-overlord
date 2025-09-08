import names from '$lib/data/names.json';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getRandomServantName = () => {
    const first = getRandomElement(names.first_names);
    const last = getRandomElement(names.last_names);
    return `${first} ${last}`;
}

export const getExpeditionLoot = (settings) => {
    const loot = {
      // todo
    }
    // todo: base return on settings and loot object
    return Math.round(Math.random() * 600+25)
}
