import { Enitty } from "../entity";

export class Bullet extends Enitty{
    constructor(scene, xPosition, yPostion, key, type){
        super(scene, xPosition, yPostion, key, type);
        this.body.velocity.x = 400;
        //@ts-ignore
        this.body.allowGravity = false;
        this.scene.physics.world.enableBody(this, 1);
    }
}