import { Bullet } from "../objects/bullet";
import { Enitty } from "../entity";

export class Player extends Enitty {
  bullet: Bullet;
  bullets: Phaser.GameObjects.Group;
  health = 100;
  isShooting = false;
  rateOfFire = 300;

  constructor(scene, xPosition, yPostion, key, type) {
    super(scene, xPosition, yPostion, key, type);
    this.createHeroAnims();
    this.bullets = this.scene.add.group();
  }

  moveRight(jumping: boolean): void {
    this.flipX = false
    this.body.velocity.x = 300;
    if (jumping === false) {
      this.anims.play('right', true);
    }
  }

  moveLeft(jumping: boolean): void {
    this.body.velocity.x = -300;
    //@ts-ignore
    this.flipX = true;
    if (jumping === false) {
      this.anims.play('left', true);
    }
  }

  jump(): void {
    this.body.velocity.y = -300;
    this.anims.play('up', true);
  }

  stand(): void {
    this.body.velocity.x = 0;
    this.anims.play('stand', true);
  }

  jumpStatic(): void {
    this.body.velocity.x = 0;
    this.anims.play('up', true);
  }
  shoot(): void {
    this.createBullet();
    this.bullets.add(this.bullet);
  }

  checkIsAlive(): void {
    if (this.health <= 0) {
      this.destroy();
    }
  }

  private createBullet(): void {
    const x = Phaser.Math.Clamp(this.x, 0, Phaser.Math.MAX_SAFE_INTEGER);
    const y = Phaser.Math.Clamp(this.y, 0, 600);
    this.bullet = new Bullet(
      this.scene,
      x,
      y,
      'bullet',
      'bullet',
      !this.flipX
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