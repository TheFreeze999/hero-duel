import UIDGenerator from "../util/UIDGenerator.js";
import Bullet from "./Bullet.js";
class Player {
    name;
    socketID;
    static uIDGenerator = new UIDGenerator(6);
    id = Player.uIDGenerator.generate();
    pos = { x: 0, y: 0 };
    size = { x: 30, y: 30 };
    movement = {
        UP: false,
        RIGHT: false,
        DOWN: false,
        LEFT: false,
    };
    speed = 3;
    pressingMouse = false;
    reloadFrames = 10;
    aimedAtCoords = { x: 0, y: 0 };
    bulletSpeed = 5;
    color = "#00f";
    game = null;
    lastShot = this.reloadFrames;
    constructor(name, socketID) {
        this.name = name;
        this.socketID = socketID;
    }
    update() {
        this.lastShot++;
        // MOVEMENT
        let speed = this.speed;
        if ((this.movement.UP || this.movement.DOWN) && (this.movement.LEFT || this.movement.RIGHT)) {
            speed *= (1 / Math.sqrt(2));
        }
        if (this.movement.UP)
            this.pos.y -= speed;
        if (this.movement.RIGHT)
            this.pos.x += speed;
        if (this.movement.DOWN)
            this.pos.y += speed;
        if (this.movement.LEFT)
            this.pos.x -= speed;
        // MOUSE PRESS
        if (this.pressingMouse && this.lastShot > this.reloadFrames) {
            this.shoot();
            this.lastShot = 0;
        }
    }
    shoot() {
        const bullet = new Bullet(this);
        const xDiff = this.aimedAtCoords.x - this.pos.x;
        const yDiff = this.aimedAtCoords.y - this.pos.y;
        const theta = Math.atan2(yDiff, xDiff);
        const velX = Math.cos(theta);
        const velY = Math.sin(theta);
        bullet.vel = { x: velX * this.bulletSpeed, y: velY * this.bulletSpeed };
        this.game?.addGameObjects(bullet);
    }
    toObject() {
        return {
            id: this.id,
            name: this.name,
            pos: this.pos,
            size: this.size,
            movement: this.movement,
            speed: this.speed,
            pressingMouse: this.pressingMouse,
            color: this.color
        };
    }
}
export default Player;
