import { Enitty } from "../../entity";

export class Spooky extends Enitty {
    demage = 1;
    demageRange = 40;
    initSpeed = 500;
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        this.createAnims();
        this.playAnim();
    }

    followPlayer(x): number {

        if (x < this.x) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
        //@ts-ignore
        this.scene.physics.moveToObject(this, this.scene.player, 150);
        return this.x;
    }

    followPlayerInInitScene(playerPosition: number): void {
        if(playerPosition - this.x <= 150){
            this.initSpeed = 200;
        } else if(playerPosition - this.x >= 400){
            this.initSpeed = 500;
        }
        this.flipX = true;
        //@ts-ignore
        this.scene.physics.moveToObject(this, this.scene.player, this.initSpeed);

    }

    addPlayerCollision(): void {
        //@ts-ignore
        if ((this.scene.player.x + this.demageRange >= this.x && this.scene.player.x - this.demageRange <= this.x) &&
            //@ts-ignore
            (this.scene.player.y + this.demageRange >= this.y && this.scene.player.y - this.demageRange <= this.y)) {
            //@ts-ignore
            this.scene.player.health -= this.demage;
        }
    }
    private playAnim(): void {
        this.anims.play('follow');
    }

    private createAnims(): void {
        this.anims.create({
            key: 'follow',
            frames: this.anims.generateFrameNumbers('spooky', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
    }
}