const cnv = document.querySelector('#canvas');
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
cnv.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mousePressed = true;
});
cnv.addEventListener('mouseup', (e) => {
    e.preventDefault();
    mousePressed = false;
});
document.addEventListener('mousemove', (e) => {
    const cnvRect = cnv.getBoundingClientRect();
    mouseCoords.x = e.pageX - cnvRect.left;
    mouseCoords.y = e.pageY - cnvRect.top;
});
