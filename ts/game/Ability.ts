import Player from "./Player.js";

abstract class Ability {
	abstract name: string;
	abstract displayName: string;
	activePlayer: Player | null = null;

	update() { }
	activate(player: Player, energyCost: number) { }

	toObject(): Ability.AsObject {
		return {
			name: this.name,
			displayName: this.displayName
		}
	}
}

namespace Ability {
	export interface AsObject {
		name: string;
		displayName: string;
	}
}

export default Ability;