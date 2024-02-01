import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
class Batman extends HeroClass {
    name = 'batman';
    displayName = 'Batman';
    imageURL = 'batman.jpg';
    abilitySet = new Set([
        { energyCost: 8, key: '1', ability: new AbilityList.InvisibilityAbility() },
        { energyCost: 6, key: '2', ability: new AbilityList.TeleportAbility() }
    ]);
    adjustPlayerStats(player) {
        player.color = "black";
    }
}
export default Batman;
