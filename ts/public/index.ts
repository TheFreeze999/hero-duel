import { Socket } from "socket.io";
declare let io: Function;
const socket: Socket = io();

const cnv = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
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

socket.on('color', (color: string) => {
	ctx.fillStyle = color;
})