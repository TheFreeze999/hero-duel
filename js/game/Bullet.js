class Bullet {
    shooter;
    pos = { x: 0, y: 0 };
    size = { x: 8, y: 8 };
    vel = { x: 0, y: -1 };
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
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.elapsedFrames > this.lifetimeFrames)
            this.game?.removeGameObjects(this);
    }
    toObject() {
        return {
            pos: this.pos,
            size: this.size,
        };
    }
}
export default Bullet;
