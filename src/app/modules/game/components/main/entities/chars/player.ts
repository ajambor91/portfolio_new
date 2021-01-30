import { Bullet } from "../objects/bullet";
import { Enitty } from "../entity";

export class Player extends Enitty {
    bullet: Bullet;
    bullets: Phaser.GameObjects.Group;

    constructor(scene, xPosition, yPostion, key, type){
        super(scene, xPosition, yPostion, key, type);
        this.createHeroAnims();
        this.bullets = this.scene.add.group();
    }

    moveRight(): void {
        this.flipX = false
        this.body.velocity.x = 400;
        this.anims.play('right', true);
    }

    moveLeft(): void {
        this.body.velocity.x = -400;
        //@ts-ignore
        this.flipX = true;
        this.anims.play('left',true);
    }

    jump(): void {
        this.body.velocity.y = -300;
        this.anims.play('up',true);
    }

    stand(): void {
      this.body.velocity.x = 0;
      this.anims.play('stand',true);
    }

    shoot(): void {
      this.createBullet();
      this.bullets.add(this.bullet);   
    }

    private createBullet(): void {
      const x = Phaser.Math.Clamp(this.x, 0, 1200);
      const y = Phaser.Math.Clamp(this.y, 0, 600);
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
          repeat: 0
        });
        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('punk', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: 0
                });
        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('punk', { frames: [3] }),
          frameRate: 1,
          repeat: 100
        })
        this.anims.create({
          key: 'stand',
          frames: this.anims.generateFrameNumbers('punk', { frames: [8] })
        });
      }   
}