import Ability from "../Ability.js";
class ShieldAbility extends Ability {
    activate(player, energyCost) {
        if (player.flags.shielded)
            return;
        console.log("Shield activated");
        player.flags.shielded = true;
        player.energy -= energyCost;
        setTimeout(() => {
            player.flags.shielded = false;
        }, 5000);
    }
}
export default ShieldAbility;
