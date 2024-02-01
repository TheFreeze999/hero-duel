import Ability from "../Ability.js";
import Player from "../Player.js";

class TeleportAbility extends Ability {
	name = 'teleport';
	displayName = 'Teleport';

	public cooldownFrames = 60;
	private lastActivation = this.cooldownFrames;

	override update(): void {
		this.lastActivation++
	}
	override activate(player: Player, energyCost: number): void {
		if (this.lastActivation < this.cooldownFrames) return;

		player.pos.set(player.aimedAtCoords)

		player.energy -= energyCost;
		this.lastActivation = 0;
	}
}

export default TeleportAbility;