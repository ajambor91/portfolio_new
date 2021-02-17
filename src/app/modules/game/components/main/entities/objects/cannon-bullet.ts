import { BulletClass } from "./bullet-class";
import { Explode } from "./explode";

export class CannonBullet extends BulletClass {

    private collider: Phaser.Physics.Arcade.Collider;
    private exploding = false;
    private turn: number;
    private speed: number;
    id: string;
    constructor(scene, xPosition: number, yPostion: number, turn: number, speed: number, key: string, type: string) {
        super(scene, xPosition, yPostion, key, type);
        //@ts-ignore
        this.body.allowGravity = true;
        this.turn = turn;
        this.speed = -speed;
        this.setAngle(turn)
        this.fire();
        this.id = type;
    }

    fire(): void {
        //@ts-ignore
        this.body.velocity.x = Math.cos(this.turn) * this.speed;
        this.body.velocity.y = Math.sin(this.turn) * this.speed;
    }

    protected addWorldCollide(): void {
        //@ts-ignore
        this.collider = this.scene.physics.add.collider(this, this.scene.layers.groundLayer, () => {
            if (this.exploding === false) {
                this.exploding = true;
                this.body.velocity.x = 0;
                const x = Phaser.Math.Clamp(this.x, 0, Phaser.Math.MAX_SAFE_INTEGER);
                const y = Phaser.Math.Clamp(this.y - this.height + 5, 0, 1100);
                const explode = new Explode(
                    this.scene,
                    x,
                    y,
                    'bullet_explode',
                    this.id,
                );
                
                this.destroy();
            }
        });
    }
}