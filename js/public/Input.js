import { cnv } from "./index.js";
const keys = new Map();
let mousePressed = false;
const mouseCoords = { x: 0, y: 0 };
export function keyIsDown(key) {
    return keys.get(key) ?? false;
}
export function mouseIsPressed() {
    return mousePressed;
}
export function getMouseCoords() {
    return mouseCoords;
}
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys.set(e.key, true);
});
document.addEventListener('keyup', (e) => {
    keys.set(e.key, false);
});
document.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mousePressed = true;
});
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    mousePressed = false;
});
document.addEventListener('mousemove', (e) => {
    const cnvRect = cnv.getBoundingClientRect();
    mouseCoords.x = e.pageX - cnvRect.left;
    mouseCoords.y = e.pageY - cnvRect.top;
});
