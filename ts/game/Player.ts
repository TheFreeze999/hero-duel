import { Socket } from "socket.io";
import Game from "./Game.js";
import UIDGenerator from "../util/UIDGenerator.js";

class Player {
	private static uIDGenerator = new UIDGenerator(6);
	id = Player.uIDGenerator.generate();

	pos = {
		x: 0,
		y: 0
	};

	movement = {
		UP: false,
		RIGHT: false,
		DOWN: false,
		LEFT: false,
	}

	color = "#00f";

	game: Game | null = null;

	constructor(public name: string, public socketID: Socket["id"]) {

	}

	toObject(): Player.AsObject {
		return {
			id: this.id,
			name: this.name,
			pos: this.pos,
			movement: this.movement,
			color: this.color
		}
	}
}

namespace Player {
	export interface AsObject {
		id: string,
		name: string,
		pos: { x: number; y: number },
		movement: Player["movement"],
		color: string
	}
}

export default Player;