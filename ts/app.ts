import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

import path from 'path';
import Game from './game/Game.js';
import Player from './game/Player.js';
import { randomColor } from './util/random.js';
const DIR_NAME = path.resolve();

const app = express();
const server = http.createServer(app);

export const io = SocketIO.listen(server);

const PORT = 8080;

const games: Game[] = [];

app.get('/', (req, res) => {
	const game = new Game();
	games.push(game);
	res.redirect(`/room/${game.id}`)
});

app.use(express.static(`${DIR_NAME}/public`))
app.use('/js', express.static(`${DIR_NAME}/js/public`))
app.use('/styles', express.static(`${DIR_NAME}/public/styles`))

app.get('/room/:id', (req, res) => {
	if (!games.some(g => g.id === req.params.id)) {
		return res.sendStatus(404);
	}
	res.sendFile(`${DIR_NAME}/public/index.html`);
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});





const FPS = 60;
function update() {

	games.forEach((game: Game) => {
		game.update();
		io.in(game.id).emit('poll');
		io.in(game.id).emit('game', game.toObject());
	})



}
setInterval(() => update(), 1000 / FPS);

io.on('connection', (socket) => {
	console.log("socket connected");

	socket.on('entry', (gameID: string, name: string, heroClassNumber: number) => {
		console.log("player entry");
		const game = games.find(g => g.id === gameID);
		if (!game) return;
		socket.join(game.id)


		const player = new Player(name, socket.id, heroClassNumber);
		const playerNumber = game.players.size;
		player.pos.set(playerNumber * 40 + 30, 70);

		game.addPlayers(player);


		io.emit('game', game.toObject());

		socket.on('movement key', (direction: keyof Player["movement"], status: boolean) => {
			player.movement[direction] = status;
		});

		socket.on('key press states', (keyPressStates: Record<string, boolean>) => {
			Object.entries(keyPressStates).forEach(([key, value]) => player.keyPressStates.set(key, value))
		});

		socket.on('mouse', (pressed: boolean) => {
			player.pressingMouse = pressed;
		});
		socket.on('mouse coords', (coords: { x: number, y: number }) => {
			player.aimedAtCoords.x = coords.x;
			player.aimedAtCoords.y = coords.y;
		})

		socket.on('disconnect', () => {
			console.log("socket disconnected")

			if (player) game.removePlayers(player)
			io.emit('game', game.toObject());

			if (game.players.size === 0) {
				setTimeout(() => {
					if (game.players.size === 0) games.splice(games.indexOf(game), 1);
				}, 1000 * 60 * 2)
			}
		});
	});
});


