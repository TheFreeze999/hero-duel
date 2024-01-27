class Game {
    players = new Set();
    addPlayers(...players) {
        const addPlayer = (player) => {
            this.players.add(player);
            player.game = this;
        };
        players.forEach(player => addPlayer(player));
    }
    toObject() {
        return {
            players: [...this.players]
        };
    }
}
export default Game;
