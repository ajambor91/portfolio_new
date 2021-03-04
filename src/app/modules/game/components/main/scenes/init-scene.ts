import { enemiesSpr, enemies } from "../data/enemies";
import { texts } from "../data/keyboard";
import { sounds } from "../data/sounds";
import { Depth } from "../enums/depth.enum";
import { Keyboard } from "../model/keyboard.model";
import { LoopMap } from "../model/loop-map.model";
import { Scene } from "./scene";

export class InitScene extends Scene {

  protected readonly name = 'InitScene';

  private readonly spookyVisibleTime = 3000;
  private readonly clickAnyKeyTextVisible = 1000;
  private readonly keyboardDescriptionDelay = 1500;

  private keys: Keyboard = new Object() as Keyboard;
  private created = false;
  private removed = false;
  private worldWidth = 1400;
  private addWorldOffset = 500;
  private removePreviusLayer = this.addWorldOffset * 3;
  private playerWorldScroll = 1;
  private maps: LoopMap[] = [];

  constructor() {
    super({ key: 'init' });
  }

  preload(): void {
    this.loadAssets();
    this.loadKeyboardImages();
    this.loadAudio();
    this.loadUniAssets();
    this.loadAudio(); // do wyrzcuenia poem
    this.loadAssets();
    this.loadUniAssets();
    this.loadSounds();
    this.audioMute = !this.registry.list.data.sound;
  }
  listenKey(timer) {
    const scene = this;
    window.addEventListener('keyup', function newScene() {
      //@ts-ignore
      scene.audio.stop();
      //@ts-ignore
      scene.time.removeEvent(timer);
      scene.scene.start('main', { audioMute: scene.audioMute });
      this.removeEventListener('keyup', newScene);

    })
  }

  create(): void {
    // this.scale.fullscreenTarget = document.querySelector('div#fs');

    if(this.registry.list.data.fullScreen){
      this.fullScreen();
    }
  
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

    this.time.delayedCall(
      this.spookyVisibleTime,
      () => this.createSpooky()
    )

    this.maps.push(createdMap);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.addSoundsBTN();
    this.displayKeysDescription()
      .then(res => {
        this.removeKeyDesc();
        const timer = this.addStartText();
        this.listenKey(timer);
      });
    this.playAudio();
  }

  update(): void {
    if(this.wasFullscreen === true && this.scale.isFullscreen === false) {
      this.revertCanvasSize();
    }
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

    for (let [key, value] of Object.entries(texts)) {
      this.load.image(value.key.key, value.path);

    }
  }

  private displayKeysDescription(): Promise<boolean> {
    return new Promise(resolve => {

      for (let [key, value] of Object.entries(texts)) {
        this.keys[key] = {
          key: this.add.bitmapText(value.desc.x, value.desc.y, 'font', value.desc.desc)
            .setFontSize(20)
            .setRotation(3.14)
            .setScrollFactor(0, 0)
            .setDepth(Depth.Texts),

          icon: this.add.image(value.key.x, value.key.y, value.key.key)
            .setScrollFactor(0, 0)
            .setDepth(Depth.Texts)
        };
      }
      this.time.delayedCall(
        this.keyboardDescriptionDelay,
        () => {
          resolve(true);
        });
    });
  }

  private addStartText(): any {
    let visible = true;
    const text = this.add.bitmapText(400, 250, 'font', 'Kliknij dowolny klawisz!')
      .setScrollFactor(0, 0)
      .setDepth(Depth.Texts);
    return this.time.addEvent({
      callback: () => {
        if (visible == false) {
          text.setVisible(true);
          visible = true;
        } else {
          text.setVisible(false);
          visible = false;
        }
      },
      delay: this.clickAnyKeyTextVisible,
      loop: true
    });
  }

  private removeKeyDesc(): void {
    for (let [key, value] of Object.entries(this.keys)) {
      for (let [inside_key, inside_value] of Object.entries(value)) {
        //@ts-ignore
        inside_value.destroy();
      }
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

  private loadAssets(): void {
    this.load.image('scroll_up','/assets/game/main/arrow_up.png');
    this.load.image('scroll_down','/assets/game/main/arrow_down.png');
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain', '/assets/game/main/mountain.png');
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
    this.load.image('blood', '/assets/game/main/blood.png');
    this.load.image('spark', '/assets/game/main/spark.png');
    this.load.image('spooky_orb', '/assets/game/main/spooky_orb.png');
    this.load.spritesheet('punk', '/assets/game/main/punk_smaller.png',
      {
        frameWidth: 128,
        frameHeight: 128
      });
    this.loadTilesets();
    this.load.tilemapTiledJSON('map', '/assets/game/main/init.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.bitmapFont('font', '/assets/game/main/fonts/cosmic_0.png', '/assets/game/main/fonts/cosmic.xml');
    this.loadEnemies();

  }

 


}