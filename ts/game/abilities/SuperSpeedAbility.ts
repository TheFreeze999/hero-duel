import Ability from "../Ability.js";
import Player from "../Player.js";

class SuperSpeedAbility extends Ability {
	name = 'superspeed';
	displayName = 'Super Speed';

	private active = false;
	private boost = 3;
	override activate(player: Player, energyCost: number): void {
		if (this.active) return;

		console.log("SuperSpeed activated");

		player.speed *= this.boost;
		this.active = true;

		player.energy -= energyCost;

		setTimeout(() => {
			player.speed /= this.boost;
			this.active = false;
		}, 2500);
	}
}

export default SuperSpeedAbility;