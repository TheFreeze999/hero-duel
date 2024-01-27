import Player from "./Player.js";

class Game {
	players = new Set<Player>();

	addPlayers(...players: Player[]) {
		const addPlayer = (player: Player) => {
			this.players.add(player);
			player.game = this;
		}
		players.forEach(player => addPlayer(player));
	}

	toObject(): Game.AsObject {
		return {
			players: [...this.players]
		}
	}
}

namespace Game {
	export interface AsObject {
		players: Player.AsObject[];
	}
}

export default Game;