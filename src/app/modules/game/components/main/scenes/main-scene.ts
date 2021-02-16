import { SoundsAudio } from "../model/sounds.model";
import { Scene } from "./scene";
import { sounds } from "../data/sounds";
import { enemies, enemiesSpr } from "../data/enemies";
import { Enemy } from "../model/enemy.model";
import { Depth } from "../enums/depth.enum";
import { TowerVisible } from "../enums/tower-visible.enum";
import { TypeHelper } from "../helpers/type-helper";

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
    this.time.addEvent({
      callback: () => this.changeVolume(),
      loop: true,
      delay: 5
    })
  }

  preload() {
    this.loadAudio(); // do wyrzcuenia poem
    this.loadAssets();
    this.loadUniAssets();
    this.loadSounds();
  }

  update() {
    if (this.player.x < 0 && this.rightOutside === false) {
      this.sounds.fallingDown.play();
      this.player.destroy();
      this.rightOutside = true;
    }
    if (this.player.x < 0) {
      this.spooky.unfollow();
      return;
    }
    if (this.player.x > 11850 && this.isTowerShow === TowerVisible.Hidden) {
      this.showTower();
    } else if ((this.player.x < 11850 || this.player.x > 14000) && this.isTowerShow === TowerVisible.Show) {
      this.hideTower();
    }
    //@ts-ignore
    this.spooky.addPlayerCollision();
    this.playerHealth.text = `${this.player.health.toFixed(0)} HP`;
    // this.player.checkIsAlive();
    if (this.player.active) {
      this.createHeroMove();
    }
    this.spookyPosition = this.spooky.followPlayer(this.spookyPosition);
  }

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.rKey = this.input.keyboard.addKey('R');
  }
  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain', '/assets/game/main/mountain.png');
    this.load.image('angular', '/assets/game/collectibles/angular.png');
    this.load.image('ground', '/assets/game/main/ground.png');
    this.load.image('test', '/assets/game/main/test.png')
    this.load.spritesheet('punk_gun', '/assets/game/main/punk_gun.png',
      {
        frameWidth: 130,
        frameHeight: 128
      });
    this.load.image('bullet', '/assets/game/main/bullet_8.png');
    this.load.spritesheet('cannon_bullet', '/assets/game/main/cannon_bullet_48.png', {
      frameWidth: 24
    });
    this.load.spritesheet('bullet_explode', '/assets/game/main/bullet_explode.png', {
      frameWidth: 75,
      frameHeight: 72
    });

    this.load.spritesheet('smoke', '/assets/game/main/smoke.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.loadTilesets();
    this.load.tilemapTiledJSON('mapMain', '/assets/game/main/layers_map_terrain.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.image('reload_big', '/assets/game/main/keyboard_icons/reload_big.png');
    this.load.image('cannon_basis', '/assets/game/chars/enemies/cannon_basis.png');
    this.loadEnemies();

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
  }

  private createColliders(): void {
    this.layers.groundLayer.setCollisionByProperty({ collides: true });
    this.layers.groundLayer.setCollisionBetween(1, 1000);
    this.layers.woodCollisionLayer.setCollisionByProperty({ collides: true });
    this.layers.woodCollisionLayer.setCollisionBetween(1, 10000);
    this.layers.monsterCollideLayer.setCollisionBetween(1, 10000);
    this.layers.monsterCollideLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.layers.woodCollisionLayer, null, null, this);
  }

  private loadSounds(): void {

    for (let [key, value] of Object.entries(sounds)) {
      this.load.audio(value.key, value.path, {
        instances: 'enemy' in value ? this.calcEnemiesInstance(value.enemy) : 1
      });
    }
  }
  private calcEnemiesInstance(objectKey: string | string[]): number {
    let i = 0;
    let j = 0
    if (Array.isArray(objectKey)) {
      for (i; i < objectKey.length - 1; i++) {
        j += this.calcInstancsLoop(objectKey[i]);
      }
    } else {
      j = this.calcInstancsLoop(objectKey);
    }
    return j;
  }

  private calcInstancsLoop(obj): number {
    let i = 0;
    for (let [key, value] of Object.entries(enemies)) {
      if (value.key === obj) {
        i++;
      }
    }
    return i;
  }

  private addSounds(): void {
    for (let [key, value] of Object.entries(sounds)) {
      if (value.main === true) this.sounds[key] = this.sound.add(value.key);
    }
  }

  private loadEnemies(): void {
    for (let [key, value] of Object.entries(enemiesSpr)) {
      this.load.spritesheet(value.key, value.path, {
        frameWidth: value.width,
        frameHeight: value.height
      });
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
        this.cameras.main.setBounds(firstBound, -300, secondBound, 900);
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
        this.cameras.main.setBounds(firstBound, -300, secondBound, 900);
        firstBound -= scroll;
        secondBound -= scroll;
        if (firstBound <= endBound) {
          this.cameras.main.setBounds(0, -300, 16000, 900);
          this.isTowerShow = TowerVisible.Hidden;
          this.time.removeEvent(move);
        }
      },
      delay: 1,
      loop: true
    });
  }
}