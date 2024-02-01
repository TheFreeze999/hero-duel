import UIDGenerator from "../util/UIDGenerator.js";
import Vector from "../util/Vector.js";
import Bullet from "./Bullet.js";
import Player from "./Player.js";

class Game {
	players = new Set<Player>();
	gameObjects = new Set<Bullet>();
	private static uIDGenerator = new UIDGenerator(6);
	id = Game.uIDGenerator.generate();

	size = new Vector(800, 500);

	currentFrame = 0;
	private scheduledEvents = new Set<Game.ScheduledEvent>();

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

		[...this.scheduledEvents].filter(event => event.frame === this.currentFrame).forEach(event => {
			event.callback();
			this.scheduledEvents.delete(event);
		})

		this.currentFrame++;
	}

	scheduleEvent(callback: Function, frame: number) {
		this.scheduledEvents.add({
			callback,
			frame
		});
	}
	scheduleEventIn(callback: Function, frame: number) {
		this.scheduledEvents.add({
			callback,
			frame: this.currentFrame + frame
		});
	}

	toObject(): Game.AsObject {
		return {
			id: this.id,
			players: [...this.players].map(player => player.toObject()),
			gameObjects: [...this.gameObjects].map(gameObject => gameObject.toObject()),
			size: this.size.toObject()
		}
	}
}

namespace Game {
	export interface AsObject {
		id: string,
		players: Player.AsObject[];
		gameObjects: Bullet.AsObject[];
		size: Vector.AsObject;
	}

	export interface ScheduledEvent {
		frame: number;
		callback: Function;
	}
}

export default Game;