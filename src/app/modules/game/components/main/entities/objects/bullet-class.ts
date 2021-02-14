import { Depth } from "../../enums/depth.enum";
import { Entity } from "../entity";

export abstract class BulletClass extends Entity{
    
    protected fireSpeed: number;
    soundKey = 'none';
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {
        super(scene, xPosition, yPostion, key, type);
        //@ts-ignore
        this.body.allowGravity = false;
        this.scene.physics.world.enableBody(this, 1);
        this.setDepth(Depth.Bullets);
        this.addWorldCollide();
    }

    protected addWorldCollide(): void {
        //@ts-ignore
        this.scene.physics.add.collider(this, this.scene.layers.groundLayer, () => {
            this.destroy();
        })
    }
}