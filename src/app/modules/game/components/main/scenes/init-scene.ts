import { HostListener } from "@angular/core";
import { Observable } from "rxjs";
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
  }

  preload(): void {
    this.loadAssets();
    this.loadKeyboardImages();
    this.loadAudio();
    this.loadUniAssets();
  }
  listenKey(timer) {
    const scene = this;
    window.addEventListener('keyup', function newScene() {
      //@ts-ignore
      scene.audio.stop();
      //@ts-ignore
      clearInterval(timer);
      scene.scene.start('main', { audioMute: scene.audioMute });
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
    this.load.image('reload', '/assets/game/main/keyboard_icons/reload.png');
  }

  private displayKeysDescription(): Promise<boolean> {
    return new Promise(resolve => {
      const texts = {
        keyup: {
          desc: {
            desc: 'Skok',
            x: 780,
            y: 120
          },
          key: {
            key: 'keyup',
            x: 800,
            y: 200
          }
        },
        keyright: {
          desc: {
            desc: 'W prawo',
            x: 860,
            y: 180
          },
          key: {
            key: 'keyright',
            x: 850,
            y: 250
          }
        },
        keyleft: {
          desc: {
            desc: 'W lewo',
            x: 650,
            y: 180
          },
          key: {
            key: 'keyleft',
            x: 750,
            y: 250
          }
        },
        space: {
          desc: {
            desc: 'Strzelaj!',
            x: 550,
            y: 400
          },
          key: {
            key: 'space',
            x: 600,
            y: 350
          }
        },
        reload: {
          desc: {
            desc: 'Przeładuj!',
            x: 320,
            y: 100
          },
          key: {
            key: 'reload',
            x: 370,
            y: 170
          }
        }
      };
      for (let [key, value] of Object.entries(texts)) {
        this.keys[key] = {
          key: this.add.bitmapText(value.desc.x, value.desc.y, 'font', value.desc.desc)
            .setFontSize(20)
            .setRotation(3.14)
            .setScrollFactor(0, 0)
            .setDepth(3),

          icon: this.add.image(value.key.x, value.key.y, value.key.key)
            .setScrollFactor(0, 0)
            .setDepth(1)
        };
      }
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

  private addStartText(): any {
    let visible = true;
    const text = this.add.bitmapText(400, 250, 'font', 'Kliknij dowolny klawisz!')
      .setScrollFactor(0, 0)
      .setDepth(5);
    return setInterval(() => {
      if (visible == false) {
        text.setVisible(true);
        visible = true;
      } else {
        text.setVisible(false);
        visible = false;
      }

    }, 1000);
  }

  private removeKeyDesc(): void {
    for (let [key, value] of Object.entries(this.keys)) {
      for (let [inside_key, inside_value] of Object.entries(value)) {
        //@ts-ignore
        inside_value.destroy();
      }
    }
  }
}