import { Depth } from "../../enums/depth.enum";
import { Entity } from "../entity";

export class Anim extends Entity{
    private readonly smokeVelocity = -200;
    constructor(scene , xPosition: number, yPostion: number, key: string, type: string) {
        super(scene, xPosition, yPostion, key, type);
        this.setDepth(Depth.CannonSmoke)
        .anim();
        this.body.velocity.y = this.smokeVelocity;
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