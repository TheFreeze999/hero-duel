import Vector from "../util/Vector.js";
import { collisionRectRect } from "../util/collision.js";
class Bullet {
    shooter;
    pos = new Vector();
    size = new Vector(80);
    vel = new Vector();
    game = null;
    constructor(shooter) {
        this.shooter = shooter;
        this.pos.x = this.shooter.pos.x;
        this.pos.y = this.shooter.pos.y;
    }
    lifetimeFrames = 300;
    elapsedFrames = 0;
    update() {
        this.elapsedFrames++;
        if (this.elapsedFrames > this.lifetimeFrames) {
            this.game?.removeGameObjects(this);
            return;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        const collidingPlayers = this.findCollidingPlayers();
        collidingPlayers.forEach(player => this.handleCollidingPlayer(player));
    }
    findCollidingPlayers() {
        if (!this.game)
            return [];
        return [...this.game.players].filter(player => player !== this.shooter).filter(player => collisionRectRect(player.pos, player.size, this.pos, this.size));
    }
    handleCollidingPlayer(player) {
        if (this.game !== null)
            this.game.removeGameObjects(this);
        player.die();
    }
    toObject() {
        return {
            pos: this.pos,
            size: this.size,
        };
    }
}
export default Bullet;
