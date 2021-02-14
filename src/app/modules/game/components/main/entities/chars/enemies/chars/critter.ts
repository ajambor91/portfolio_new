import { Depth } from "../../../../enums/depth.enum";
import { EnemyClass } from "../enemy-class";

export class Critter extends EnemyClass {

    protected health = 50;

    private speed = 50;
    private dmg = 5;

    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {

        super(scene, xPosition, yPostion, key, type);
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.allowGravity = false;
        //@ts-ignore
        this.body.allowGravity = true;
        this.addWorldCollision();
        this.addPlayerCollision();
        //@ts-ignore
        this.body.setSize(50, 115);
        this.move();
    }

    protected playAnim(): void {
        this.anims.play('critter_walk');
        this.body.velocity.x = this.speed;
    }

    protected createAnims(): void {
        this.anims.create({
            key: 'critter_walk',
            frames: this.anims.generateFrameNumbers('critter', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    }

    private move(): void {
        this.body.velocity.x = this.speed;
    }

    private addPlayerCollision(): void {
        //@ts-ignore
        this.playerCollider = this.scene.physics.add.collider(this, this.scene.player, () => {
            //@ts-ignore
            this.scene.player.health -= this.dmg;
        });
    }
}
