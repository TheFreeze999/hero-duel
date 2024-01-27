import Player from "./Player.js";
import Game from './Game.js';

class Bullet {
	pos = { x: 0, y: 0 };
	size = { x: 8, y: 8 };
	vel = { x: 0, y: -1 };

	game: Game | null = null;
	constructor(public shooter: Player) {
		this.pos.x = this.shooter.pos.x;
		this.pos.y = this.shooter.pos.y;
	}

	lifetimeFrames = 300;

	private elapsedFrames = 0;

	update() {
		this.elapsedFrames++;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		if (this.elapsedFrames > this.lifetimeFrames) this.game?.removeGameObjects(this);
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