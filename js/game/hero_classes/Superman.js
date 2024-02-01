import AbilityList from "../AbilityList.js";
import HeroClass from "../HeroClass.js";
class Superman extends HeroClass {
    name = 'superman';
    displayName = 'Superman';
    imageURL = 'superman.jpg';
    abilitySet = new Set([
        { energyCost: 8, key: '1', ability: new AbilityList.ShieldAbility() },
        { energyCost: 6, key: '2', ability: new AbilityList.SuperSpeedAbility() },
    ]);
    adjustPlayerStats(player) {
        player.color = "red";
    }
}
export default Superman;
