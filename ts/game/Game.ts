import UIDGenerator from "../util/UIDGenerator.js";
import Player from "./Player.js";

class Game {
	players = new Set<Player>();
	private static uIDGenerator = new UIDGenerator(6);
	id = Game.uIDGenerator.generate();

	addPlayers(...players: Player[]) {
		const addPlayer = (player: Player) => {
			this.players.add(player);
			player.game = this;
		}
		players.forEach(player => addPlayer(player));
	}

	removePlayers(...players: Player[]) {
		const removePlayer = (player: Player) => {
			this.players.delete(player)
			player.game = null;
		}
		players.forEach(player => removePlayer(player));
	}

	toObject(): Game.AsObject {
		return {
			id: this.id,
			players: [...this.players]
		}
	}
}

namespace Game {
	export interface AsObject {
		id: string,
		players: Player.AsObject[]
	}
}

export default Game;