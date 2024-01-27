export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomArrayElement(arr) {
    return arr[randomInteger(0, arr.length - 1)];
}
export function randomColor() {
    return randomArrayElement([
        "red",
        "blue",
        "green",
        "lime",
        "yellow",
        "black",
        "orange",
        "purple",
        "magneta",
    ]);
}
