import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
class Superman extends HeroClass {
    name = 'superman';
    displayName = 'Superman';
    imageURL = 'superman.jpg';
    abilitySet = new Set([
        { energyCost: 6, key: '1', ability: new AbilityList.ShieldAbility() },
        { energyCost: 4, key: '2', ability: new AbilityList.SuperSpeedAbility() },
    ]);
    adjustPlayerStats(player) {
        player.color = "red";
    }
}
export default Superman;
