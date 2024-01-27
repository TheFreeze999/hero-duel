import UIDGenerator from "../util/UIDGenerator.js";
class Game {
    players = new Set();
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
    toObject() {
        return {
            id: this.id,
            players: [...this.players]
        };
    }
}
export default Game;
