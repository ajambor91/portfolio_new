import { Bullet } from "../objects/bullet";
import { Enitty } from "../entity";

export class Player extends Enitty{
    bullet;
    constructor(scene, xPosition, yPostion, key, type){
        super(scene, xPosition, yPostion, key, type);
        this.createHeroAnims();
        //@ts-ignore
        // this.body.collideWorldBounds =true;
    }

    moveRight(): void {
        this.body.velocity.x = 400;
        this.anims.play('right', true);

    }

    moveLeft(): void {
        this.body.velocity.x = -400;
    }

    jump(): void {
      //@ts-ignore
      if(this.body.blocked.down) {
        this.body.velocity.y = -300;
        // this.anims.play('jump',true);
      }
      //@ts-ignore
    }

    stand(): void {
      this.body.velocity.x = 0;
      this.anims.play('stand',true);
    }
    shoot(): void {
      this.createBullet();
      //@ts-ignore
      this.scene.bullets.add(this.bullet);
      
    }

    private createBullet(): void {
      const x = Phaser.Math.Clamp(this.x, 0, 1200);
      const y = Phaser.Math.Clamp(this.y, 0, 600);
      //@ts-ignore
      this.bullet = new Bullet(
        this.scene,
        x,
        y,
        'bullet',
        'bullet'
      );
    }
    private createHeroAnims(): void {
    
        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('punk', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: 0,
        });
        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('punk', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: 0,
          yoyo: true
        });
        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('punk', { frames: [4] }),
          frameRate: 1,
          repeat: -1,

        })
        this.anims.create({
          key: 'stand',
          frames: this.anims.generateFrameNumbers('punk', { frames: [8] })
    
        })
      }   
}