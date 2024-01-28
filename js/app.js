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
app.get('/', (req, res) => {
    res.sendFile(`${DIR_NAME}/public/index.html`);
});
app.use(express.static(`${DIR_NAME}/public`));
app.use('/js', express.static(`${DIR_NAME}/js/public`));
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
const game = new Game();
const FPS = 60;
function update() {
    io.emit('poll');
    game.update();
    io.emit('game', game.toObject());
}
setInterval(() => update(), 1000 / FPS);
io.on('connection', (socket) => {
    console.log("socket connected");
    const playerNumber = game.players.size;
    const player = new Player(`player${playerNumber}`, socket.id);
    player.pos.set(playerNumber * 40 + 30, 70);
    player.color = randomColor();
    game.addPlayers(player);
    io.emit('game', game.toObject());
    socket.on('movement key', (direction, status) => {
        player.movement[direction] = status;
    });
    socket.on('mouse', (pressed) => {
        player.pressingMouse = pressed;
    });
    socket.on('mouse coords', (coords) => {
        player.aimedAtCoords.x = coords.x;
        player.aimedAtCoords.y = coords.y;
    });
    socket.on('disconnect', () => {
        console.log("socket disconnected");
        if (player)
            game.removePlayers(player);
        io.emit('game', game.toObject());
    });
});
