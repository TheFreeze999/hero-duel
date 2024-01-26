const socket = io();
const cnv = document.querySelector('#canvas');
const ctx = cnv.getContext('2d');
const FPS = 60;
let x = 10;
function update() {
    x++;
}
function render() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillRect(x, 60, 20, 30);
    window.requestAnimationFrame(() => render());
}
render();
setInterval(() => update(), 1000 / FPS);
socket.on('color', (color) => {
    ctx.fillStyle = color;
});
export {};
