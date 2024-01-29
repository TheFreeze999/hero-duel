import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
class Superman extends HeroClass {
    name = 'superman';
    displayName = 'Superman';
    imageURL = 'superman.jpg';
    abilitySet = new Set([
        { energyCost: 3, key: '1', ability: new AbilityList.ShieldAbility() }
    ]);
    adjustPlayerStats(player) {
        player.color = "red";
    }
}
export default Superman;
