import { BulletClass } from "./bullet-class";

export class Explode extends BulletClass{
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        this.createAnims();
        this.playAnims();
    }

    private createAnims(): void {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('bullet_explode', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
    }

    private playAnims(): void {
        this.anims.play('explode',true).on('animationcomplete', ()=>{
            this.destroy();
        });
    }
}