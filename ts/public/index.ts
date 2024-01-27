import { Socket } from "socket.io";
import Game from "../game/Game.js";
declare let io: Function;
const socket: Socket = io();

const cnv = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
const FPS = 60;

let gameAsObject: Game.AsObject | null = null;




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

socket.on('game', (gameData: Game.AsObject) => {
	gameAsObject = gameData;
})