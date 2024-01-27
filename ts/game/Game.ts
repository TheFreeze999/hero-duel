import UIDGenerator from "../util/UIDGenerator.js";
import Bullet from "./Bullet.js";
import Player from "./Player.js";

class Game {
	players = new Set<Player>();
	gameObjects = new Set<Bullet>();
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

	addGameObjects(...gameObjects: Bullet[]) {
		const addGameObject = (gameObject: Bullet) => {
			this.gameObjects.add(gameObject);
			gameObject.game = this;
		}
		gameObjects.forEach(gameObject => addGameObject(gameObject));
	}

	removeGameObjects(...gameObjects: Bullet[]) {
		const removeGameObject = (gameObject: Bullet) => {
			this.gameObjects.delete(gameObject)
			gameObject.game = null;
		}
		gameObjects.forEach(gameObject => removeGameObject(gameObject));
	}

	update() {
		this.players.forEach(player => player.update());
		this.gameObjects.forEach(gameObject => gameObject.update());
	}

	toObject(): Game.AsObject {
		return {
			id: this.id,
			players: [...this.players].map(player => player.toObject()),
			gameObjects: [...this.gameObjects].map(gameObject => gameObject.toObject()),
		}
	}
}

namespace Game {
	export interface AsObject {
		id: string,
		players: Player.AsObject[];
		gameObjects: Bullet.AsObject[];
	}
}

export default Game;