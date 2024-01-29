import Ability from "../Ability.js";
class SuperSpeedAbility extends Ability {
    active = false;
    boost = 3;
    activate(player, energyCost) {
        if (this.active)
            return;
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