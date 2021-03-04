import { Depth } from "../../../../enums/depth.enum";
import { EnemyClass } from "../enemy-class";

export class Snake extends EnemyClass{
    soundKey = ['snake','bulletBodyImpact','beastDeath'];
    mainSound = 'snake';
    killPoints = 10;
    protected readonly dmg = 15;
    protected readonly speed = 100;
    protected health = 80;
  
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {

        super(scene, xPosition, yPostion, key, type);
        this.addWorldCollision();
        this.addPlayerCollision();
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.allowGravity = false;
        //@ts-ignore
        this.body.allowGravity = true;

        //@ts-ignore
        this.body.setSize(30, 115).setOffset(50, -5);
        this.playSound('snake');

        this.move();
    }

    protected createAnims(): void {
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('snake', {start: 0, end: 5}),
            repeat: -1,
            frameRate: 10
        });
    }

    protected playAnim(): void {
        this.anims.play('move');
    }
}