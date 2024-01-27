import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import path from 'path';
import Game from './game/Game.js';
import Player from './game/Player.js';
const DIR_NAME = path.resolve();
const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);
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
const player1 = new Player("player1");
player1.pos = { x: 50, y: 200 };
const player2 = new Player("player2");
player2.color = "red";
player2.pos = { x: 300, y: 70 };
game.addPlayers(player1, player2);
io.on('connection', (socket) => {
    console.log("socket connected");
    socket.emit("game", game.toObject());
});
