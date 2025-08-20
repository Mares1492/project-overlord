import names from '$lib/data/names.json';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const getRandomServantName = () => {
    const first = getRandomElement(names.first_names);
    const last = getRandomElement(names.last_names);
    return `${first} ${last}`;
}
