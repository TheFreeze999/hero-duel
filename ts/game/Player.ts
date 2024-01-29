import { Socket } from "socket.io";
import Game from "./Game.js";
import UIDGenerator from "../util/UIDGenerator.js";
import Bullet from "./Bullet.js";
import { randomInteger } from "../util/random.js";
import Vector from "../util/Vector.js";
import { io } from "../app.js";
import { clamp } from "../util/functions.js";
import HeroClass from "./HeroClass.js";
import HeroClassList from "./HeroClassList.js";
import { keyIsDown } from "../public/Input.js";
import ShieldAbility from "./abilities/ShieldAbility.js";

class Player {
	private static uIDGenerator = new UIDGenerator(6);
	id = Player.uIDGenerator.generate();

	pos = new Vector();
	size = new Vector(30);

	movement = {
		UP: false,
		RIGHT: false,
		DOWN: false,
		LEFT: false,
	};
	speed = 3;

	pressingMouse = false;
	reloadFrames = 30;
	aimedAtCoords = new Vector();

	keyPressStates = new Map<string, boolean>();

	bulletSpeed = 5;
	/** Bullet spread (degrees) */
	bulletSpread = 0;

	color = "#00f";

	game: Game | null = null;

	lastShot = this.reloadFrames;

	heroClass: HeroClass = new HeroClassList.Superman();

	maxEnergy = 10;
	energy = this.maxEnergy;

	private framesSinceLastEnergyIncrease = 60;

	flags = {
		shielded: false,
		invisible: false,
	}

	constructor(public name: string, public socketID: Socket["id"], heroClassNumber: number) {

		if (heroClassNumber === 1) this.heroClass = new HeroClassList.Superman();
		if (heroClassNumber === 2) this.heroClass = new HeroClassList.Batman();

		this.heroClass.adjustPlayerStats(this);
	}

	update() {
		this.lastShot++;
		this.framesSinceLastEnergyIncrease++;

		// MOVEMENT
		let speed = this.speed;
		if ((this.movement.UP || this.movement.DOWN) && (this.movement.LEFT || this.movement.RIGHT)) {
			speed *= (1 / Math.sqrt(2));
		}
		if (this.movement.UP) {
			this.pos.subtract(0, speed);
		}
		if (this.movement.RIGHT) {
			this.pos.add(speed, 0);
		}
		if (this.movement.DOWN) {
			this.pos.add(0, speed);
		}
		if (this.movement.LEFT) {
			this.pos.subtract(speed, 0);
		}

		if (this.game) {
			this.pos.x = clamp(this.pos.x, this.size.x / 2, this.game.size.x - this.size.x / 2);
			this.pos.y = clamp(this.pos.y, this.size.y / 2, this.game.size.y - this.size.y / 2);
		}

		// MOUSE PRESS
		if (this.pressingMouse && this.lastShot > this.reloadFrames) {
			this.shoot();
			this.lastShot = 0;
		}

		// Update Abilities
		this.heroClass.abilitySet.forEach(abilitySetEntry => {
			abilitySetEntry.ability.update();

			if (this.isPressingKey(abilitySetEntry.key) && this.energy >= abilitySetEntry.energyCost) {
				abilitySetEntry.ability.activate(this, abilitySetEntry.energyCost);
			}
		});

		if (this.framesSinceLastEnergyIncrease >= 60) {
			this.energy++;
			this.framesSinceLastEnergyIncrease = 0;
		}


	}

	shoot() {
		const bullet = new Bullet(this);
		const diffVec = this.aimedAtCoords.difference(this.pos)
		const theta = diffVec.atan2() + randomInteger(-this.bulletSpread, this.bulletSpread) * Math.PI / 180;

		const vel = Vector.unitVectorFromAngle(theta).product(this.bulletSpeed, this.bulletSpeed);
		bullet.vel.set(vel);

		this.game?.addGameObjects(bullet);
	}

	toObject(): Player.AsObject {
		return {
			id: this.id,
			name: this.name,
			pos: this.pos,
			size: this.size,
			movement: this.movement,
			speed: this.speed,
			pressingMouse: this.pressingMouse,
			color: this.color,
			flags: this.flags
		}
	}

	die(cause: Player.DyingCause) {
		if (cause === 'bullet' && this.flags.shielded) {
			this.flags.shielded = false;
			return;
		}

		if (this.game) this.game.removePlayers(this);
		const socket = io.sockets.sockets[this.socketID];
		if (!socket) return;
		socket.emit('death')
	}

	private isPressingKey(key: string): boolean {
		return this.keyPressStates.get(key) ?? false;
	}
}

namespace Player {
	export type DyingCause = 'bullet';
	export interface AsObject {
		id: string,
		name: string,
		pos: { x: number; y: number },
		size: { x: number; y: number },
		movement: Player["movement"],
		speed: number,
		pressingMouse: boolean,
		color: string,
		flags: Player["flags"]
	}
}

export default Player;