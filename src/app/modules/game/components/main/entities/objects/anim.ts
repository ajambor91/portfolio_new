import { Depth } from "../../enums/depth.enum";
import { Entity } from "../entity";

export class Anim extends Entity{
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        this.setDepth(Depth.CannonSmoke)
        .anim();
        this.body.velocity.y = -200;
        //@ts-ignore
        this.body.allowGravity = false;
    }

    private anim(): void {
        this.anims.create({
            key: 'smoke',
            frames: this.anims.generateFrameNumbers('smoke', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: 0,
        });
        this.anims.play('smoke', false).on('animationcomplete', () => {
            this.destroy();
        });
    }
}