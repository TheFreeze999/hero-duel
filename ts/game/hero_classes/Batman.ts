import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
import Player from "../Player.js";

class Batman extends HeroClass {
	name = 'batman';
	displayName = 'Batman';
	imageURL = 'batman.jpg';
	abilitySet = new Set([
		{ energyCost: 6, key: '1', ability: new AbilityList.InvisibilityAbility() },
		{ energyCost: 8, key: '2', ability: new AbilityList.TeleportAbility() }
	]);

	override adjustPlayerStats(player: Player): void {
		player.color = "black";
	}
}

export default Batman;