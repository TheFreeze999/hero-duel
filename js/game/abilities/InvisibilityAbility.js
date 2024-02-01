import Ability from "../Ability.js";
class InvisibilityAbility extends Ability {
    name = 'invisibility';
    displayName = 'Invisibility';
    activate(player, energyCost) {
        if (player.flags.invisible)
            return;
        console.log("Invisibility activated");
        player.flags.invisible = true;
        player.energy -= energyCost;
        setTimeout(() => player.flags.invisible = false, 2000);
    }
}
export default InvisibilityAbility;
