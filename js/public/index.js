import { getMouseCoords, keyIsDown, mouseIsPressed } from "./Input.js";
const socket = io();
export const cnv = document.querySelector('#canvas');
const ctx = cnv.getContext('2d');
let gameData = null;
function render() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    if (gameData) {
        // Render Game Objects
        gameData.gameObjects.forEach(gameObject => {
            ctx.fillStyle = "black";
            ctx.fillRect(gameObject.pos.x - gameObject.size.x / 2, gameObject.pos.y - gameObject.size.y / 2, gameObject.size.x, gameObject.size.y);
        });
        // Render Players
        gameData.players.forEach(player => {
            ctx.fillStyle = player.color;
            ctx.fillRect(player.pos.x - player.size.x / 2, player.pos.y - player.size.y / 2, player.size.x, player.size.y);
        });
    }
    window.requestAnimationFrame(() => render());
}
render();
socket.on('poll', () => {
    socket.emit('movement key', "UP", keyIsDown('ArrowUp') || keyIsDown('w'));
    socket.emit('movement key', "RIGHT", keyIsDown('ArrowRight') || keyIsDown('d'));
    socket.emit('movement key', "DOWN", keyIsDown('ArrowDown') || keyIsDown('s'));
    socket.emit('movement key', "LEFT", keyIsDown('ArrowLeft') || keyIsDown('a'));
    socket.emit('mouse', mouseIsPressed());
    socket.emit('mouse coords', getMouseCoords());
});
socket.on('game', (_gameData) => {
    gameData = _gameData;
});
socket.on('death', () => {
    alert("you died");
});
