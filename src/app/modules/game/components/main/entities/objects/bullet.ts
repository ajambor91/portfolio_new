import { Depth } from "../../enums/depth.enum";
import { Entity } from "../entity";
import { BulletClass } from "./bullet-class";

export class Bullet extends BulletClass {
    fireSpeed = 500;
    constructor(scene, xPosition, yPostion, key, type, isForwardShooting: boolean) {
        super(scene, xPosition, yPostion, key, type);
        this.body.velocity.x = isForwardShooting ? this.fireSpeed : - this.fireSpeed;
    }
}