import { HostListener } from "@angular/core";
import { LoopMap } from "../model/loop-map.model";
import { Scene } from "./scene";


export class InitScene extends Scene {

  protected readonly name = 'InitScene';

  private cursors;
  private created = false;
  private removed = false;
  private worldWidth = 1400;
  private addWorldOffset = 500;
  private removePreviusLayer = this.addWorldOffset * 3;
  private playerWorldScroll = 1;
  private maps: LoopMap[] = [];
  private spookyPosition: number;
  constructor() {
    super({ key: 'init' });
    this.listenKey();
  }

  preload(): void {
    this.loadAssets();
    this.loadKeyboardImages();
  }
  listenKey() {
    const scene = this;
    window.addEventListener('keyup', function newScene() {
      //@ts-ignore
      scene.scene.start('main');
      this.removeEventListener('keyup', newScene);
    })
  }
  create(): void {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.addFixedBackground();
    this.addBgParallax(99999);
    this.createHero();
    this.setCameras(999999);
    this.map = this.add.tilemap('map');
    this.createTilesets();
    this.createWorldLayers();
    const collider = this.createColliders(this.layers.groundLayer);
    const createdMap: LoopMap = {
      map: this.map,
      collider: collider
    };
    //@ts-ignore
    setTimeout(() => {
      this.createSpooky()
    }, 3000)
    this.displayKeys();
    this.maps.push(createdMap);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    //@ts-ignore
    if (this.player.body.blocked.down) {
      this.player.moveRight(false);

    } else {
      this.player.stand();

    }
    if (this.spooky) {
      this.spooky.followPlayerInInitScene(this.player.x);

    }

    if (this.player.x >= this.addWorldOffset * this.playerWorldScroll && this.created === false) {
      this.createLoopMap();
      this.createWorldLayers(this.worldWidth * this.playerWorldScroll);
      const collider = this.createColliders(this.layers.groundLayer);
      const createdMap: LoopMap = {
        map: this.map,
        collider: collider
      };
      this.maps.push(createdMap);
      this.created = true;
      this.playerWorldScroll++;
      this.removed = false;
    } else if (this.player.x >= this.removePreviusLayer * this.playerWorldScroll && this.removed === false) {
      const mapToRemoveIndex = this.playerWorldScroll - 2
      const map = this.maps[mapToRemoveIndex];
      this.removeMap(map, mapToRemoveIndex);
      this.removed = true;
    }
    if (this.player.x >= this.addWorldOffset * 2 * this.playerWorldScroll) {
      this.created = false;
    }
  }

  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain', '/assets/game/main/mountain.png');
    this.load.spritesheet('punk', '/assets/game/main/punk_smaller.png',
      {
        frameWidth: 128,
        frameHeight: 112
      });
    this.loadTilesets();
    this.load.tilemapTiledJSON('map', '/assets/game/main/init.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.bitmapFont('font', '/assets/game/main/fonts/cosmic_0.png', '/assets/game/main/fonts/cosmic.xml');
  }

  private createColliders(layer): Phaser.Physics.Arcade.Collider {
    layer.setCollisionByProperty({ collides: true });
    layer.setCollisionBetween(1, 1000);
    return this.physics.add.collider(this.player, layer, null, null, this);
  }

  private createLoopMap(): void {
    this.map = this.add.tilemap('map');
  }

  private removeMap(map: LoopMap, key: number) {
    this.physics.world.removeCollider(map.collider);
    map.map.destroy();
  }

  private loadKeyboardImages(): void {
    this.load.image('keyup', '/assets/game/main/keyboard_icons/arrow_up.png');
    this.load.image('keyright', '/assets/game/main/keyboard_icons/arrow_right.png');
    this.load.image('keyleft', '/assets/game/main/keyboard_icons/arrow_left.png');
    this.load.image('space', '/assets/game/main/keyboard_icons/space.png');

  }

  private displayKeys(): void {
    this.add.image(1100, 100, 'keyup')
      .setScrollFactor(0, 0)
      .setDepth(1);
    this.add.image(1050, 150, 'keyleft')
      .setScrollFactor(0, 0)
      .setDepth(1);
    this.add.image(1150, 150, 'keyright')
      .setScrollFactor(0, 0)
      .setDepth(1);
    this.add.image(980, 210, 'space')
      .setScrollFactor(0, 0)
      .setDepth(1);
  }
}