import Ability from "../Ability.js";
class SuperSpeedAbility extends Ability {
    name = 'superspeed';
    displayName = 'Super Speed';
    active = false;
    boost = 3;
    activate(player, energyCost) {
        if (this.active)
            return;
        console.log("SuperSpeed activated");
        player.speed *= this.boost;
        this.active = true;
        player.energy -= energyCost;
        player.game?.scheduleEventIn(() => {
            player.speed /= this.boost;
            this.active = false;
        }, 150);
    }
}
export default SuperSpeedAbility;
