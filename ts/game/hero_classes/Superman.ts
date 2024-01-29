import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
import Player from "../Player.js";

class Superman extends HeroClass {
	name = 'superman';
	displayName = 'Superman';
	imageURL = 'superman.jpg';
	abilitySet = new Set([
		{ energyCost: 3, key: '1', ability: new AbilityList.ShieldAbility() }
	]);

	override adjustPlayerStats(player: Player): void {
		player.color = "red"
	}
}

export default Superman;