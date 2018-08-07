/* random-service */

function getRandomId() {
    let randomDouble = (Math.random() * 5) + 1; // generate between [1,5] inclusive
    let randomInt = Math.floor(randomDouble);

    return randomInt;
}

function getRandomName() {
    let randomId = getRandomId();
    if (randomId === 1) return 'Mommy';
    if (randomId === 5) return 'SeQi';
    else return `Q${randomId}`;
}

export default {
    getRandomId,
    getRandomName
};