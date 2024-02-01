import Ability from "./Ability.js";
import Player from "./Player.js";

abstract class HeroClass {
	abstract name: string;
	abstract displayName: string;
	abstract imageURL: string;
	abstract abilitySet: Set<HeroClass.AbilitySetEntry>;

	adjustPlayerStats(player: Player): void { }

	toObject(): HeroClass.AsObject {
		return {
			name: this.name,
			displayName: this.displayName,
			imageURL: this.imageURL,
			abilitySet: [...this.abilitySet].map(entry => ({ ...entry, ability: entry.ability.toObject() }))
		}
	}
}

namespace HeroClass {
	export interface AbilitySetEntry {
		energyCost: number;
		key: string;
		ability: Ability;
	}

	export interface AbilitySetEntryAsObject {
		energyCost: number;
		key: string;
		ability: Ability.AsObject;
	}

	export interface AsObject {
		name: string;
		displayName: string;
		imageURL: string;
		abilitySet: AbilitySetEntryAsObject[];
	}
}

export default HeroClass;