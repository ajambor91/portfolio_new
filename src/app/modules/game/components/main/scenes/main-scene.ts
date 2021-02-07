import { Spooky } from "../entities/chars/enemies/spooky";
import { Player } from "../entities/chars/player";
import { layerNames, tilesetNames } from "../key-name/keys";
import { Cursors } from "../model/cursors.model";

import { Scene } from "./scene";

export class MainScene extends Scene {

  cursors: Cursors;
  playerHealth: Phaser.GameObjects.BitmapText;
  magazine: Phaser.GameObjects.BitmapText;
  spookyPosition: number;
  displayReload = false;
  reloadedText: Phaser.GameObjects.BitmapText;
  protected readonly name = 'MainScene';

  constructor() {
    super({ key: 'main' });

  }
  init(data){
    this.audioMute = data.audioMute;
  }
  create() {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.addFixedBackground();
    this.addBgParallax(2);
    this.createHero();
    this.createCursors();
    this.setCameras();
    this.map = this.add.tilemap('mapMain');
    this.createTilesets();
    this.createWorldLayers();
    this.createColliders();
    this.createSpooky();
    this.playerHealth = this.add.bitmapText(10, 10, 'font', '100 HP')
      .setScrollFactor(0, 0);
    this.magazine  = this.add.bitmapText(150,10, 'font', `${this.player.magazine} AMMO`)
      .setScrollFactor(0,0);
    setInterval(() => {
      this.player.isShooting = false;
    }, this.player.rateOfFire);
    this.addSoundsBTN();
    this.playAudio();
  }

  preload() {
    this.loadAudio(); // do wyrzcuenia poem
    this.loadAssets();
    this.loadUniAssets();
    this.loadSounds();
  }

  update() {
    //@ts-ignore
    this.spooky.addPlayerCollision();
    this.playerHealth.text = `${this.player.health} HP`;
    // this.player.checkIsAlive();
    if (this.player.active) {
      this.createHeroMove();
    }
    this.spookyPosition = this.spooky.followPlayer(this.spookyPosition);
  }

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.rKey= this.input.keyboard.addKey('R'); 
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
    this.loadTilesets();
    this.load.tilemapTiledJSON('mapMain', '/assets/game/main/layers_map_terrain.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.image('reload_big', '/assets/game/main/keyboard_icons/reload_big.png');

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
    if (this.cursors.rKey.isDown){
      this.player.reload();
    }
  }

  private createColliders(): void {
    this.layers.groundLayer.setCollisionByProperty({ collides: true });
    this.layers.groundLayer.setCollisionBetween(1, 1000);
    this.layers.woodCollisionLayer.setCollisionByProperty({ collides: true });
    this.layers.woodCollisionLayer.setCollisionBetween(1, 10000);
    this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.layers.woodCollisionLayer, null, null, this);
  }

  private loadSounds(): void {
    this.load.audio('reload_sound', '/assets/game/audio/reload.mp3');
    this.load.audio('gunshot', '/assets/game/audio/gunshot_new.mp3');
    this.load.audio('squeak','/assets/game/audio/squeak.mp3')
  }
}