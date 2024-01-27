const socket = io();
const cnv = document.querySelector('#canvas');
const ctx = cnv.getContext('2d');
const FPS = 60;
let gameAsObject = null;
function update() {
}
function render() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    if (gameAsObject)
        gameAsObject.players.forEach(player => {
            ctx.fillStyle = player.color;
            ctx.fillRect(player.pos.x - 10, player.pos.y - 10, 20, 20);
        });
    window.requestAnimationFrame(() => render());
}
render();
setInterval(() => update(), 1000 / FPS);
socket.on('game', (gameData) => {
    gameAsObject = gameData;
});
export {};
