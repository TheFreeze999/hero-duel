import UIDGenerator from "../util/UIDGenerator.js";
class Player {
    name;
    socketID;
    static uIDGenerator = new UIDGenerator(6);
    id = Player.uIDGenerator.generate();
    pos = {
        x: 0,
        y: 0
    };
    movement = {
        UP: false,
        RIGHT: false,
        DOWN: false,
        LEFT: false,
    };
    color = "#00f";
    game = null;
    constructor(name, socketID) {
        this.name = name;
        this.socketID = socketID;
    }
    toObject() {
        return {
            id: this.id,
            name: this.name,
            pos: this.pos,
            movement: this.movement,
            color: this.color
        };
    }
}
export default Player;
