import { Depth } from "../../enums/depth.enum";
import { Entity } from "../entity";
import { BulletClass } from "./bullet-class";

export class DemonBullet extends BulletClass {
    fireSpeed = 500;
    private xSpeed = 25;
    private ySpeed = -300
    
    constructor(scene, xPosition, yPostion, key, type, i) {
        super(scene, xPosition, yPostion, key, type);
        // this.body.velocity.x = isForwardShooting ? this.fireSpeed : - this.fireSpeed;
        //@ts-ignore
        // this.body.allowGravity = false;
        this.body.velocity.x =  i > 3 ? (-i * this.xSpeed) : (i * this.xSpeed) + this.xSpeed * 2;
        this.body.velocity.y = this.ySpeed;
        // this.body.mass = 1;
            //@ts-ignore
        this.setScale(2);     
    }

    
}