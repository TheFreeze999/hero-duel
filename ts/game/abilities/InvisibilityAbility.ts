import Ability from "../Ability.js";
import Player from "../Player.js";

class InvisibilityAbility extends Ability {

	override activate(player: Player, energyCost: number): void {
		if (player.flags.invisible) return;

		console.log("Invisibility activated");

		player.flags.invisible = true;

		player.energy -= energyCost;

		setTimeout(() => player.flags.invisible = false, 2000);
	}
}

export default InvisibilityAbility;