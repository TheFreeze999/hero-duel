import Ability from "./Ability.js";
import Player from "./Player.js";

abstract class HeroClass {
	abstract name: string;
	abstract displayName: string;
	abstract imageURL: string;
	abstract abilitySet: Set<HeroClass.AbilitySetEntry>;

	adjustPlayerStats(player: Player): void { }
}

namespace HeroClass {
	export interface AbilitySetEntry {
		energyCost: number;
		key: string;
		ability: Ability;
	}
}

export default HeroClass;