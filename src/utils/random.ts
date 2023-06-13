export function getRandomInt(min = 0, max = 1) {
    const refinedMin = Math.ceil(min);
    const refinedMax = Math.floor(max);
    return Math.floor(Math.random() * (refinedMax - refinedMin) + refinedMin);
}

export function getRandomIntInclusive(min = 0, max = 1) {
    const refinedMin = Math.ceil(min);
    const refinedMax = Math.floor(max);
    return Math.floor(
        Math.random() * (refinedMax - refinedMin + 1) + refinedMin
    );
}

export function getRandomBoolean() {
    return Math.random() < 0.5;
}
