import Ability from "../Ability.js";
class ShieldAbility extends Ability {
    name = 'shield';
    displayName = 'Shield';
    static shieldSignatureKey = Symbol('shield signature key');
    activate(player, energyCost) {
        if (player.flags.shielded)
            return;
        console.log("Shield activated");
        const shieldSignature = Symbol('shield signature');
        player.flags.shielded = true;
        player.data[ShieldAbility.shieldSignatureKey] = shieldSignature;
        player.energy -= energyCost;
        setTimeout(() => {
            if (player.data[ShieldAbility.shieldSignatureKey] === shieldSignature) {
                player.flags.shielded = false;
            }
        }, 3000);
    }
}
export default ShieldAbility;
