import { Spooky } from "../entities/chars/enemies/spooky";
import { Player } from "../entities/chars/player";
import { layerNames, tilesetNames } from "../data/keys";
import { Cursors } from "../model/cursors.model";
import { SoundsAudio } from "../model/sounds.model";

import { Scene } from "./scene";
import { sounds } from "../data/sounds";

export class MainScene extends Scene {
  rightOutside = false;
  cursors: Cursors;
  playerHealth: Phaser.GameObjects.BitmapText;
  magazine: Phaser.GameObjects.BitmapText;
  spookyPosition: number;
  displayReload = false;
  reloadedText: Phaser.GameObjects.BitmapText;
  sounds: SoundsAudio;
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
    this.addSounds();
  }

  preload() {
    this.loadAudio(); // do wyrzcuenia poem
    this.loadAssets();
    this.loadUniAssets();
    this.loadSounds();
  }

  update() {
    if( this.player.x < 0 && this.rightOutside === false){
      console.log(this.player.x);

      this.sounds.fallingDown.play();
      this.player.destroy();
      this.rightOutside = true;
    } 
    if(this.player.x < 0) {
      this.spooky.unfollow();
      return;
    }
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
        console.log('audio',this.audio)
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

    for (let [key,value] of Object.entries(sounds)){
      this.load.audio(value.key, value.path);
    }
  }

  private addSounds(): void {
    this.sounds = {} as SoundsAudio;
    for (let [key, value] of Object.entries(sounds)){
      this.sounds[key] = this.sound.add(value.key);
    }
  }
}