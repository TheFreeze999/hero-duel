import Player from "./Player.js";
import Game from './Game.js';
import Vector from "../util/Vector.js";
import { collisionRectRect } from "../util/collision.js";

class Bullet {
	pos = new Vector();
	size = new Vector(8);
	vel = new Vector();

	game: Game | null = null;
	constructor(public shooter: Player) {
		this.pos.x = this.shooter.pos.x;
		this.pos.y = this.shooter.pos.y;
	}

	lifetimeFrames = 300;

	private elapsedFrames = 0;

	update() {
		this.elapsedFrames++;
		if (this.elapsedFrames > this.lifetimeFrames) {
			this.game?.removeGameObjects(this);
			return;
		}

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		const collidingPlayers = this.findCollidingPlayers();
		collidingPlayers.forEach(player => this.handleCollidingPlayer(player));
	}

	private findCollidingPlayers(): Player[] {
		if (!this.game) return [];
		return [...this.game.players].filter(player => player !== this.shooter).filter(player => collisionRectRect(player.pos, player.size, this.pos, this.size));
	}

	private handleCollidingPlayer(player: Player) {
		if (this.game !== null)
			this.game.removeGameObjects(this);
		player.die();
	}





	toObject() {
		return {
			pos: this.pos,
			size: this.size,
		};
	}
}

namespace Bullet {
	export interface AsObject {
		pos: { x: number; y: number },
		size: { x: number; y: number },
	}
}

export default Bullet;