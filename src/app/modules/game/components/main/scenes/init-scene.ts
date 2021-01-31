import { Scene } from "./scene";


export class InitScene extends Scene{


    constructor() {
        super({key: 'init'});
    }

    preload(): void {
        this.loadAssets();
    }

    create(): void {

    }

    update(): void {

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
    
      private loadTilesets(): void {
          this.load.image('ground', '/assets/game/main/env_ground.png');
          this.load.image('trees', '/assets/game/main/env_trees.png');
      }
}