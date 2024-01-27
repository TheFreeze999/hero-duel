class Player {
    name;
    pos = {
        x: 0,
        y: 0
    };
    color = "#00f";
    game = null;
    constructor(name) {
        this.name = name;
    }
    toObject() {
        return {
            name: this.name,
            pos: this.pos,
            color: this.color
        };
    }
}
export default Player;
