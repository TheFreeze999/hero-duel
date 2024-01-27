import UIDGenerator from "../util/UIDGenerator.js";
class Game {
    players = new Set();
    gameObjects = new Set();
    static uIDGenerator = new UIDGenerator(6);
    id = Game.uIDGenerator.generate();
    addPlayers(...players) {
        const addPlayer = (player) => {
            this.players.add(player);
            player.game = this;
        };
        players.forEach(player => addPlayer(player));
    }
    removePlayers(...players) {
        const removePlayer = (player) => {
            this.players.delete(player);
            player.game = null;
        };
        players.forEach(player => removePlayer(player));
    }
    addGameObjects(...gameObjects) {
        const addGameObject = (gameObject) => {
            this.gameObjects.add(gameObject);
            gameObject.game = this;
        };
        gameObjects.forEach(gameObject => addGameObject(gameObject));
    }
    removeGameObjects(...gameObjects) {
        const removeGameObject = (gameObject) => {
            this.gameObjects.delete(gameObject);
            gameObject.game = null;
        };
        gameObjects.forEach(gameObject => removeGameObject(gameObject));
    }
    update() {
        this.players.forEach(player => player.update());
        this.gameObjects.forEach(gameObject => gameObject.update());
    }
    toObject() {
        return {
            id: this.id,
            players: [...this.players].map(player => player.toObject()),
            gameObjects: [...this.gameObjects].map(gameObject => gameObject.toObject()),
        };
    }
}
export default Game;
