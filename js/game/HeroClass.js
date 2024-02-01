class HeroClass {
    adjustPlayerStats(player) { }
    toObject() {
        return {
            name: this.name,
            displayName: this.displayName,
            imageURL: this.imageURL,
            abilitySet: [...this.abilitySet].map(entry => ({ ...entry, ability: entry.ability.toObject() }))
        };
    }
}
export default HeroClass;
