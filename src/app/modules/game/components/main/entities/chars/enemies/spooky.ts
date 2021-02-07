import { Enitty } from "../../entity";

export class Spooky extends Enitty {
    private readonly demage = 1;
    private readonly demageRange = 40;
    private initSpeed = 500;
    private squeak = false;
    private isPosition = false;

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
    unfollow(): void {
        if(this.isPosition === false){
            this.scene.cameras.main.startFollow(this);
            this.flipX = true;    
            this.isPosition = true;
        }
        if(this.y > 350) this.scene.physics.moveTo(this,16000, 250);
        this.body.velocity.x = 300;
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
            if (this.squeak === false ) {
                this.squeak = true;
                this.scene.sound.add('squeak').play();
                setTimeout(()=>{
                    this.squeak = false;
                },800)
            }             
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