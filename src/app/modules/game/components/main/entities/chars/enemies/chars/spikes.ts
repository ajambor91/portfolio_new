import { Depth } from "../../../../enums/depth.enum";
import { EnemyClass } from "../enemy-class";

export class Spikes extends EnemyClass {

    protected dmg = .5;
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {

        super(scene, xPosition, yPostion, key, type);
        this.setDepth(Depth.Traps)
        //@ts-ignore
        this.body.allowGravity = false;
        //@ts-ignore
        this.body.allowGravity = true;
        this.addWorldCollision();
        this.addPlayerCollision();
        //@ts-ignore
    }

    addPlayerBulletCollide(bullet): void {}
    
}
