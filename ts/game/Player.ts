import Game from "./Game.js";

class Player {
	pos = {
		x: 0,
		y: 0
	};
	color = "#00f";

	game: Game | null = null;

	constructor(public name: string) {

	}

	toObject(): Player.AsObject {
		return {
			name: this.name,
			pos: this.pos,
			color: this.color
		}
	}
}

namespace Player {
	export interface AsObject {
		name: string,
		pos: { x: number; y: number },
		color: string
	}
}

export default Player;