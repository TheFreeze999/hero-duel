
import { Socket } from "socket.io";
import Game from "../game/Game.js";
import { getMouseCoords, keyIsDown, keyPressStates, mouseIsPressed } from "./Input.js";
import Player from "../game/Player.js";
declare let io: Function;
const socket: Socket = io();

export const cnv = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;

let playerID = "";

const name = prompt('Select a name:', 'player') ?? 'player';
const heroClass = Number(prompt(
	`Select a hero:
	1=Superman
	2=Batman`
	, '1')) ?? 1;

const gameID = document.location.href.split('/').at(-1) ?? "";
const codeEl = document.querySelector('.code') as HTMLSpanElement;
codeEl.innerText = gameID;
socket.emit('entry', gameID, name, heroClass);

socket.on('player data', (playerData: Player.AsObject) => {
	playerID = playerData.id;

	const abilitiesEl = document.querySelector('.abilities-heading') as HTMLUListElement;
	abilitiesEl.innerText = "";
	playerData.heroClass.abilitySet.forEach((entry, i) => {
		abilitiesEl.innerHTML += `
			<li class="ability">
				<p class="ability-name-text">Ability <span class="ability-number">${i + 1}</span>: <span
						class="ability-name">${entry.ability.displayName}</span></p>
				<p class="ability-cost-text">Energy cost: <span class="ability-cost">${entry.energyCost}</span></p>
				<p class="ability-key-text">Keybind: <span class="ability-key">${entry.key}</span></p>
			</li>
			`
	})
})


let gameData: Game.AsObject | null = null;

function render() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);


	if (gameData) {
		// Render Game Objects
		gameData.gameObjects.forEach(gameObject => {
			ctx.save();
			ctx.fillStyle = gameObject.color;
			ctx.fillRect(gameObject.pos.x - gameObject.size.x / 2, gameObject.pos.y - gameObject.size.y / 2, gameObject.size.x, gameObject.size.y);
			ctx.restore();
		})

		// Render Players
		gameData.players.forEach(player => {
			if (player.flags.invisible) return;
			ctx.save();
			ctx.fillStyle = player.color;
			ctx.fillRect(player.pos.x - player.size.x / 2, player.pos.y - player.size.y / 2, player.size.x, player.size.y);
			ctx.textAlign = 'center';
			ctx.fillText(player.name, player.pos.x, player.pos.y - 20);

			if (player.flags.shielded) {
				ctx.strokeStyle = 'cyan';
				ctx.lineWidth = 10;
				ctx.strokeRect(player.pos.x - player.size.x / 2 - 40, player.pos.y - player.size.y / 2 - 40, player.size.x + 80, player.size.y + 80)
			}
			ctx.restore();
		});

		const thisPlayer = gameData.players.find(player => player.id === playerID);
		if (thisPlayer) {
			const heroClassNameEl = document.querySelector('.hero-class-name') as HTMLSpanElement;
			const energyEl = document.querySelector('.energy') as HTMLSpanElement;

			heroClassNameEl.innerText = thisPlayer.heroClass.displayName;
			energyEl.innerText = thisPlayer.energy.toString();
		}
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

	socket.emit('key press states', Object.fromEntries(keyPressStates.entries()));
})


socket.on('game', (_gameData: Game.AsObject) => {
	gameData = _gameData;

	if (!onFirstGameDataReceival.executed) onFirstGameDataReceival(gameData);
});

function onFirstGameDataReceival(gameData: Game.AsObject) {
	cnv.width = gameData.size.x;
	cnv.style.setProperty('width', `${gameData.size.x}px`);
	cnv.height = gameData.size.y;
	cnv.style.setProperty('height', `${gameData.size.y}px`);
	onFirstGameDataReceival.executed = true;
}
onFirstGameDataReceival.executed = false;

socket.on('death', () => {
	alert("You died!");
})