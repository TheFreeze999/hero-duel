import Player from "./Player.js";

class Ability {
	activePlayer: Player | null = null;

	update() { }
	activate(player: Player, energyCost: number) { }
}

export default Ability;