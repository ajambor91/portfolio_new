import { Scene } from "./scene";
import { sounds } from "../data/sounds";
import { enemies, enemiesSpr } from "../data/enemies";
import { Enemy } from "../model/enemy.model";
import { Depth } from "../enums/depth.enum";
import { TowerVisible } from "../enums/tower-visible.enum";
import { delay } from "rxjs/operators";

export class MainScene extends Scene {
  rightOutside = false;
  playerHealth: Phaser.GameObjects.BitmapText;
  magazine: Phaser.GameObjects.BitmapText;
  spookyPosition: number;
  displayReload = false;
  reloadedText: Phaser.GameObjects.BitmapText;
  enemies: Enemy;
  isTowerShow = TowerVisible.Hidden;
  cameraMoved = false;
  isPlayerOnTar = false;
  elapsedTime = 0;
  protected readonly name = 'MainScene';

  constructor() {
    super({ key: 'main' });

  }
  init(data) {
    this.audioMute = data.audioMute;
  }
  create() {
    this.addSounds();
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.addFixedBackground();
    this.addBgParallax();
    this.createHero();
    this.createCursors();
    this.setCameras();
    this.map = this.add.tilemap('mapMain');
    this.createTilesets();
    this.createWorldLayers();
    this.createColliders();
    this.createSpooky();
    this.playerHealth = this.add.bitmapText(10, 10, 'font', '100 HP')
      .setScrollFactor(0, 0)
      .setDepth(Depth.Texts);
    this.magazine = this.add.bitmapText(150, 10, 'font', `${this.player.magazine} AMMO`)
      .setScrollFactor(0, 0)
      .setDepth(Depth.Texts);
    this.time.addEvent({
      callback: () => {
        this.player.isShooting = false;
      },
      delay: this.player.rateOfFire,
      loop: true
    });
    this.addSoundsBTN();
    this.playAudio();
    this.addEnemies();
    this.addTarOverlap();
    this.time.addEvent({
      callback: () => this.changeVolume(),
      loop: true,
      delay: 5
    })
    this.time.addEvent({
      callback: () => {this.elapsedTime++},
      delay: 1000,
      loop: true
    });
    //@ts-ignore
    this.spooky.addPlayerCollision();
  }

  preload() {

  }

  update() {
    this.addTarOverlap();
    // if(this.isPlayerOnTar === true) {
    //   this.player.velocity = 75;
    // }else if(this.isPlayerOnTar === false) {
    //   this.player.velocity = 300;
    // }
    // this.isPlayerOnTar = false;
    this.playerHealth.text = `${this.player.health.toFixed(0)} HP`;
    if(this.player.x > 15500){
      this.finishGame();
    }
    if (this.player.x < 0 && this.rightOutside === false || this.player.health <= 0) {
      this.sounds.fallingDown.play();
      this.player.destroy();
      this.rightOutside = true;
    }
    if (this.player.x < 0 || this.player.health <= 0) {
      this.spooky.unfollow();
      return;
    }
    if (this.player.x > 11850 && this.isTowerShow === TowerVisible.Hidden) {
      this.showTower();
    } else if ((this.player.x < 11850 || this.player.x > 14000) && this.isTowerShow === TowerVisible.Show) {
      this.hideTower();
    }

    // this.player.checkIsAlive();
    if (this.player.active) {
      this.createHeroMove();
    }
    this.spookyPosition = this.spooky.followPlayer(this.spookyPosition);
  }

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.rKey = this.input.keyboard.addKey('R');
    this.cursors.backspaceKey = this.input.keyboard.addKey('Backspace');
  }


  private createHeroMove(): void {
    if (this.cursors.right.isDown) {
      this.player.rateOfFire += 300;
      //@ts-ignore
      this.player.moveRight(!this.player.body.blocked.down);
    }
    else if (this.cursors.left.isDown) {
      //@ts-ignore
      this.player.moveLeft(!this.player.body.blocked.down);
    }
    //@ts-ignore
    else if (this.player.body.blocked.down) {
      this.player.stand();
    }
    //@ts-ignore
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.jump();
      //@ts-ignore
    } else if (!this.player.body.blocked.down && !this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.jumpStatic();
    }
    if (this.cursors.space.isDown) {
      if (!this.player.isShooting) {
        this.player.shoot();
        this.magazine.text = `${this.player.magazine} AMMO`;
        this.player.isShooting = true;
      }
    }
    if (this.cursors.rKey.isDown) {
      this.player.reload();
    }
    if (this.cursors.backspaceKey.isDown) {
      this.resetGame();
    }
  }

  private createColliders(): void {
    this.layers.groundLayer.setCollisionByProperty({ collides: true });
    this.layers.groundLayer.setCollisionBetween(1, 1000);
    this.layers.woodCollisionLayer.setCollisionByProperty({ collides: true });
    this.layers.woodCollisionLayer.setCollisionBetween(1, 10000);
    this.layers.monsterCollideLayer.setCollisionBetween(1, 10000);
    this.layers.monsterCollideLayer.setCollisionByProperty({ collides: true });
    this.layers.tarLayer.setCollisionBetween(1, 10000);
    this.layers.tarLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.layers.woodCollisionLayer, null, null, this);
  }



  private addSounds(): void {
    for (let [key, value] of Object.entries(sounds)) {
      if (value.main === true) this.sounds[key] = this.sound.add(value.key);
    }
  }



  private addEnemies(): void {
    this.enemies = {} as Enemy;
    for (let [key, value] of Object.entries(enemies)) {
      this.enemies[key] = new value.class(
        this,
        value.xPosition,
        value.yPosition,
        value.key,
        value.type,
        'shotDelay' in value && value.shotDelay

      );
    }
  }

  private showTower(): void {
    this.isTowerShow = TowerVisible.Moving;
    let firstBound = this.player.x - this.gameWidth / 2;
    let secondBound = this.player.x + this.gameWidth / 2;
    const scroll = 10;
    const endBound = this.player.x + this.gameWidth;
    const cameraMove = this.time.addEvent({
      callback: () => {
        this.cameras.main.setBounds(firstBound, 0, secondBound, 1120);
        firstBound += scroll;
        secondBound += scroll;
        if (secondBound >= endBound) {
          this.isTowerShow = TowerVisible.Show;
          this.time.removeEvent(cameraMove);
        }
      },
      delay: 1,

      loop: true
    });
  }

  private hideTower(): void {
    this.isTowerShow = TowerVisible.Moving;
    let firstBound = this.player.x;
    let secondBound = this.player.x + this.gameWidth;
    const endBound = firstBound - this.gameWidth;
    const scroll = 10;
    const move = this.time.addEvent({
      callback: () => {
        this.cameras.main.setBounds(firstBound, 0, secondBound, 1120);
        firstBound -= scroll;
        secondBound -= scroll;
        if (firstBound <= endBound) {
          this.cameras.main.setBounds(0, 0, 16000, 1120);
          this.isTowerShow = TowerVisible.Hidden;
          this.time.removeEvent(move);
        }
      },
      delay: 1,
      loop: true
    });
  }

  private resetGame(): void {
    this.time.removeAllEvents();
    this.scene.start('main', { audioMute: this.audioMute });
  }

  private finishGame(): void {
    this.time.removeAllEvents();
    this.scene.start('summary',{
      audioMute: this.audioMute,
      time: this.elapsedTime,
      points: this.player.points,
      killed: this.player.killed
    });
  }
}