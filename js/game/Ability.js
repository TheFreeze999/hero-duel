class Ability {
    activePlayer = null;
    update() { }
    activate(player, energyCost) { }
    toObject() {
        return {
            name: this.name,
            displayName: this.displayName
        };
    }
}
export default Ability;
