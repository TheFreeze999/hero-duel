import Ability from "../Ability.js";
import Player from "../Player.js";

class ShieldAbility extends Ability {
	name = 'shield';
	displayName = 'Shield';

	private static shieldSignatureKey = Symbol('shield signature key');


	override activate(player: Player, energyCost: number): void {
		if (player.flags.shielded) return;

		console.log("Shield activated");

		const shieldSignature = Symbol('shield signature');
		player.flags.shielded = true;
		player.data[ShieldAbility.shieldSignatureKey] = shieldSignature;

		player.energy -= energyCost;


		player.game?.scheduleEventIn(() => {
			if (player.data[ShieldAbility.shieldSignatureKey] === shieldSignature) {
				player.flags.shielded = false;
			}
		}, 180);
	}
}

export default ShieldAbility;