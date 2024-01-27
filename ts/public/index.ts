import { Socket } from "socket.io";
import Game from "../game/Game.js";
import keyIsDown from "./KeyPress.js";
declare let io: Function;
const socket: Socket = io();

const cnv = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;


let gameAsObject: Game.AsObject | null = null;

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

socket.on('poll', () => {
	socket.emit('movement key', "UP", keyIsDown('ArrowUp'))
	socket.emit('movement key', "RIGHT", keyIsDown('ArrowRight'))
	socket.emit('movement key', "DOWN", keyIsDown('ArrowDown'))
	socket.emit('movement key', "LEFT", keyIsDown('ArrowLeft'))
})


socket.on('game', (gameData: Game.AsObject) => {
	gameAsObject = gameData;
	console.log(gameData.id)
});