import { Spooky } from "../entities/chars/enemies/spooky";
import { Player } from "../entities/chars/player";
import { layerNames, tilesetNames } from "../key-name/keys";

import { Scene } from "./scene";

export class MainScene extends Scene {

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  playerHealth: Phaser.GameObjects.BitmapText;
  spookyPosition: number;

  protected readonly name = 'MainScene';

  constructor() {
    super({ key: 'main' });
  }

  create() {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.addFixedBackground();
    this.addBgParallax(2);
    this.createHero();
    this.createCursors();
    this.setCameras();
    this.map = this.add.tilemap('map');
    this.createTilesets();
    this.createWorldLayers();
    this.createColliders();
    this.createSpooky();
    this.playerHealth = this.add.bitmapText(10, 10, 'font', '100')
      .setScrollFactor(0, 0);
    setInterval(() => {
      this.player.isShooting = false;
    }, this.player.rateOfFire);
  }

  preload() {
    this.loadAssets();
  }

  update() {
    //@ts-ignore
    this.spooky.addPlayerCollision();
    this.playerHealth.text = `${this.player.health}`;
    // this.player.checkIsAlive();
    if (this.player.active) {
      this.createHeroMove();
    }
    this.spookyPosition = this.spooky.followPlayer(this.spookyPosition);
  }

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain', '/assets/game/main/mountain.png');
    this.load.image('angular', '/assets/game/collectibles/angular.png');
    this.load.image('ground', '/assets/game/main/ground.png');
    this.load.image('test', '/assets/game/main/test.png')
    this.load.spritesheet('punk', '/assets/game/main/punk_smaller.png',
      {
        frameWidth: 128,
        frameHeight: 112
      });
    this.load.image('bullet', '/assets/game/main/bullets24.png');
    this.loadTilesets();
    this.load.tilemapTiledJSON('map', '/assets/game/main/layers_map_terrain.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.bitmapFont('font', '/assets/game/main/fonts/cosmic_0.png', '/assets/game/main/fonts/cosmic.xml');
  }

  private createHeroMove(): void {
    if (this.cursors.right.isDown) {
      this.player.rateOfFire += 300;
      //@ts-ignore
      this.player.moveRight(this.player.body.blocked.down);
    }
    else if (this.cursors.left.isDown) {
      //@ts-ignore
      this.player.moveLeft(this.player.body.blocked.down);
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
        this.player.isShooting = true;
      }
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
}