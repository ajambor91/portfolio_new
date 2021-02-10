import { Bullet } from "../objects/bullet";
import { Entity } from "../entity";
import { Depth } from "../../enums/depth.enum";

export class Player extends Entity {

  health = 100;
  isShooting = false;
  rateOfFire = 100;
  dmg = 10; 
  bullet: Bullet;

  private readonly initMag = 15;
  magazine = this.initMag;

  private reloaded = false;
  private bullets: Phaser.GameObjects.Group;

  constructor(scene, xPosition, yPostion, key, type) {
    super(scene, xPosition, yPostion, key, type);
    this.bullets = this.scene.add.group();
    this.setDepth(Depth.Player);
    //@ts-ignore 
    this.body.setImmovable(true);
            //@ts-ignore
            this.body.setSize(50,110)
            .setOffset(null,17);
    

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
    const isAmmo = this.checkIsAmmo()
    if (isAmmo && this.reloaded === false) {
      this.createBullet();
      this.bullets.add(this.bullet);
      //@ts-ignore
      this.scene.sounds.gunshot.play();
      this.emptyAmmo();
      //@ts-ignore
    } else if (!isAmmo && this.scene.displayReload === false && this.reloaded === false) {
      this.addReloadText();
    }

  }
  reload(): void {
    //@ts-ignore
    if (this.scene.displayReload !== false) this.removeReloadedText();

    if (this.reloaded === false) {
      //@ts-ignore
      this.scene.sounds.reload.play();
      this.reloaded = true;
      setTimeout(() => {
        this.magazine = this.initMag;
        this.reloaded = false;
        //@ts-ignore
        this.scene.magazine.text = `${this.magazine} AMMO`;
      }, 500);
    }
  }

  checkIsAlive(): void {
    if (this.health <= 0) {
      this.destroy();
    }
  }

  createHeroAnims(): void {
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('punk', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('punk', { frames: [8] })
    });
  }

  heroAnimsWithGun(): void {
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('punk_gun', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('punk_gun', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('punk_gun', { frames: [3] }),
      frameRate: 1,
      repeat: 100
    })
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('punk_gun', { frames: [8] })
    });
  }

  private emptyAmmo(): void {
    if (this.magazine > 0) this.magazine--;
  }

  private checkIsAmmo(): boolean {
    return this.magazine > 0;
  }

  private createBullet(): void {
    const xBulletPositionMove = !this.flipX ? 40 : - 40;
    const x = Phaser.Math.Clamp(this.x + xBulletPositionMove, 0, Phaser.Math.MAX_SAFE_INTEGER);
    const y = Phaser.Math.Clamp(this.y + 15, 0, 600);
    this.bullet = new Bullet(
      this.scene,
      x,
      y,
      'bullet',
      'bullet',
      !this.flipX
    );
    //@ts-ignore
        //@ts-ignore
    for(let [key, value] of Object.entries(this.scene.enemies)){
      //@ts-ignore
      value.addPlayerBulletCollide(this.bullet);
    }
  }

  private addReloadText() {
    let isVisible = true;
    //@ts-ignore
    this.scene.reloadedText = this.scene.add.image(600, 250, 'reload_big')
      .setScrollFactor(0, 0)
      .setRotation(0.17)
      .setDepth(Depth.Texts);
    //@ts-ignore
    this.scene.displayReload = setInterval(() => {
      if (isVisible === false) {
        //@ts-ignore
        this.scene.reloadedText
          .setVisible(true);
        isVisible = true;
      } else {
        //@ts-ignore
        this.scene.reloadedText.setVisible(false);
        isVisible = false;
      }
    }, 500);
  }

  private removeReloadedText(): void {
    //@ts-ignore
    this.scene.reloadedText.destroy();
    //@ts-ignore
    clearInterval(this.scene.displayReload);
    //@ts-ignore
    this.scene.displayReload = false;
  }
}