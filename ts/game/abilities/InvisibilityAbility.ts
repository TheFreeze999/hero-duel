import Ability from "../Ability.js";
import Player from "../Player.js";

class InvisibilityAbility extends Ability {
	name = 'invisibility';
	displayName = 'Invisibility';

	override activate(player: Player, energyCost: number): void {
		if (player.flags.invisible) return;

		console.log("Invisibility activated");

		player.flags.invisible = true;

		player.energy -= energyCost;

		player.game?.scheduleEventIn(() => player.flags.invisible = false, 120);
	}
}

export default InvisibilityAbility;