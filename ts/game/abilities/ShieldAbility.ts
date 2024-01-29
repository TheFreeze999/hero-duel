import Ability from "../Ability.js";
import Player from "../Player.js";

class ShieldAbility extends Ability {

	override activate(player: Player, energyCost: number): void {
		if (player.flags.shielded) return;

		console.log("Shield activated");

		player.flags.shielded = true;

		player.energy -= energyCost;

		setTimeout(() => player.flags.shielded = false, 5000);
	}
}

export default ShieldAbility;