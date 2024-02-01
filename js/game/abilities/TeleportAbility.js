import Ability from "../Ability.js";
class TeleportAbility extends Ability {
    name = 'teleport';
    displayName = 'Teleport';
    cooldownFrames = 60;
    lastActivation = this.cooldownFrames;
    update() {
        this.lastActivation++;
    }
    activate(player, energyCost) {
        if (this.lastActivation < this.cooldownFrames)
            return;
        player.pos.set(player.aimedAtCoords);
        player.energy -= energyCost;
        this.lastActivation = 0;
    }
}
export default TeleportAbility;
