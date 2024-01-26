import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

import path from 'path';
const DIR_NAME = path.resolve();

const app = express();
const server = http.createServer(app);

const io = SocketIO.listen(server);

const PORT = 8080;

app.get('/', (req, res) => {
	res.sendFile(`${DIR_NAME}/public/index.html`)
});

app.use(express.static(`${DIR_NAME}/public`))
app.use('/js', express.static(`${DIR_NAME}/js/public`))


server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});

io.on('connection', (socket) => {
	console.log("socket connected")

	socket.emit("color", "#f00")
})