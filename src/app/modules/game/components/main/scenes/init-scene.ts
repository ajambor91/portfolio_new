import { HostListener } from "@angular/core";
import { Keyboard } from "../model/keyboard.model";
import { LoopMap } from "../model/loop-map.model";
import { Scene } from "./scene";


export class InitScene extends Scene {

  protected readonly name = 'InitScene';
  private keys: Keyboard = new Object() as Keyboard;
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
    this.loadAudio();
    this.loadUniAssets();
  }
  listenKey() {
    const scene = this;
    window.addEventListener('keyup', function newScene() {
      //@ts-ignore
      scene.scene.start('main');
      this.removeEventListener('keyup', newScene);
    })
  }
  playAudio(){
    const audio = this.audio;
    window.addEventListener('click', function play(){
      if(!audio.isPlaying){
        audio.play();
      }
      this.removeEventListener('click', play);
    });
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
    this.audio = this.sound.add('theme')
    //@ts-ignore
    // this.audio.play();
    //@ts-ignore
    this.audio.setLoop(true);
    this.addSoundsBTN();
    this.displayKeysDescription();
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
    const icons = {
      keyup: {
        key: 'keyup',
        x: 800,
        y: 200
      },
      keyleft: {
        key: 'keyleft',
        x: 750,
        y: 250
      },
      keyright: {
        key: 'keyright',
        x: 850,
        y: 250
      },
      space: {
        key: 'space',
        x: 600,
        y: 350
      }
    }
    for(let [key, value] of Object.entries(icons)){
     this.keys[key] = {
       icon: this.add.image(value.x, value.y, value.key)
       .setScrollFactor(0, 0)
       .setDepth(1)
     } ;
    }
  }

  private displayKeysDescription(){
    const texts = {
      keyup: {
        desc: 'Skok',
        x: 780,
        y: 120
      },
      keyright: {
        desc: 'W prawo',
        x: 860,
        y: 180
      },      
      keyleft: {
        desc: 'W lewo',
        x: 650,
        y: 180
      }, 
      space: {
        desc: 'Strzelaj!',
        x: 550,
        y: 400
      },
    };
    for (let [key, value] of Object.entries(texts)){
      this.keys[key] = {
        key: this.add.bitmapText(value.x, value.y, 'font', value.desc)
        .setFontSize(20)
        .setRotation(3.14)
        .setScrollFactor(0, 0)
        .setDepth(3)
      }; 
    }
  }
}