import { Spooky } from "../entities/chars/enemies/spooky";
import { Player } from "../entities/chars/player";
import { tilesetNames, layerNames } from "../key-name/keys";
import { Layer } from "../model/layer.model";
import { Tileset } from "../model/tileset.model";

export abstract class Scene extends Phaser.Scene{
    player: Player;
    gameWidth: number;
    gameHeight: number;
    background: Phaser.GameObjects.Image;
    spooky: Spooky;
    layers: Layer;
    tilesets: Tileset;
    map: Phaser.Tilemaps.Tilemap;
    
    protected name;
    protected readonly layerYPosition = -200;

    constructor(key) {
        super(key);
    }

    protected addFixedBackground(): void {
        this.background = this.add.image(this.gameWidth * 0.5, this.gameHeight * 0.5, 'background')
          .setScrollFactor(0, 0);
      }

    protected addBgParallax(count: number): void {
        let x = 0;
        do {
          const bg = this.add.image(x, this.gameHeight * 1.5, 'mountain')
            .setOrigin(0, 1)
            .setScrollFactor(1.25, 1);
          x += bg.width
        } while (x < 24000);
      }  

    protected setCameras(): void {
        this.cameras.main.setBounds(0, -300, 16000, 900)
        this.cameras.main.startFollow(this.player);
    }  

    protected createHero(): void {
        this.player = new Player(
          this,
          100,
          60,
          'punk',
          "sprPlayer"
        );
      }
    
      protected createSpooky(): void {
        this.spooky = new Spooky(
          this,
          300,
          60,
          'spooky',
          "sprSpooky"
        );
      }

      protected createTilesets(): void {
        this.tilesets = {} as Tileset;
        for (let key in tilesetNames) {
          if (tilesetNames[key].scenes.includes(this.name)) {
            this.tilesets[key] = this.map.addTilesetImage(tilesetNames[key].tilesetName, tilesetNames[key].tilesetKey);
          }
        }
      }
    
      protected createWorldLayers(): void {
        this.layers = {} as Layer;
        for (let key in layerNames) {
          if (layerNames[key].scenes.includes(this.name)) {
            this.layers[key] = this.map.createLayer(layerNames[key].name, this.tilesets[layerNames[key].tilesetKey], 0, this.layerYPosition);
          }
        }
      }

      protected loadTilesets(): void {
        for (let key in tilesetNames) {
          if(tilesetNames[key].scenes.includes(this.name)){
            this.load.image(tilesetNames[key].tilesetKey, tilesetNames[key].path);
          }
        }
      }
}