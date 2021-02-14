import { BulletClass } from "./bullet-class";

export class Bullet extends BulletClass {
    fireSpeed = 500;
    soundKey = 'none';
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string, isForwardShooting: boolean) {
        super(scene, xPosition, yPostion, key, type);
        this.body.velocity.x = isForwardShooting ? this.fireSpeed : - this.fireSpeed;
    }
}