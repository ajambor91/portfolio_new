import { Enitty } from "../entity";

export class Bullet extends Enitty {
    fireSpeed = 400;
    constructor(scene, xPosition, yPostion, key, type, isForwardShooting: boolean) {
        super(scene, xPosition, yPostion, key, type);
        this.body.velocity.x = isForwardShooting ? this.fireSpeed : - this.fireSpeed;
        //@ts-ignore
        this.body.allowGravity = false;
        this.scene.physics.world.enableBody(this, 1);
    }
}