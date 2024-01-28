import { Socket } from "socket.io";
import Game from "../game/Game.js";
import { getMouseCoords, keyIsDown, mouseIsPressed } from "./Input.js";
declare let io: Function;
const socket: Socket = io();

export const cnv = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;

const gameID = document.location.href.split('/').at(-1) ?? "";
console.log(gameID);
socket.emit('entry', gameID)


let gameData: Game.AsObject | null = null;

function render() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);


	if (gameData) {
		// Render Game Objects
		gameData.gameObjects.forEach(gameObject => {
			ctx.fillStyle = "black";
			ctx.fillRect(gameObject.pos.x - gameObject.size.x / 2, gameObject.pos.y - gameObject.size.y / 2, gameObject.size.x, gameObject.size.y);
		})

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
	socket.emit('movement key', "UP", keyIsDown('ArrowUp') || keyIsDown('w'))
	socket.emit('movement key', "RIGHT", keyIsDown('ArrowRight') || keyIsDown('d'))
	socket.emit('movement key', "DOWN", keyIsDown('ArrowDown') || keyIsDown('s'))
	socket.emit('movement key', "LEFT", keyIsDown('ArrowLeft') || keyIsDown('a'))

	socket.emit('mouse', mouseIsPressed());
	socket.emit('mouse coords', getMouseCoords());
})


socket.on('game', (_gameData: Game.AsObject) => {
	gameData = _gameData;
});

socket.on('death', () => {
	alert("you died");
})