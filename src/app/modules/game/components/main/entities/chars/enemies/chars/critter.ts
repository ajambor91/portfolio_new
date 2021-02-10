import { Depth } from "../../../../enums/depth.enum";
import { EnemyClass } from "../enemy-class";

export class Critter extends EnemyClass {

    protected health = 50;

    private speed = 50;
    private dmg = 5;

    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        // this.createAnims();
        // this.playAnim();
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.allowGravity = false;
        //@ts-ignore
        this.body.allowGravity = true;
        this.addWorldCollision();
        this.addPlayerCollision();
        console.log('critterrrrrr', this.x)
        //@ts-ignore
        this.body.setSize(50,126);
        this.move();
    }

    protected playAnim(): void {
        console.log('chuj', this.x)
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
