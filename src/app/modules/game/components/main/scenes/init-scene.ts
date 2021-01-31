import { Scene } from "./scene";


export class InitScene extends Scene{

    protected readonly name = 'InitScene';

    private cursors;

    constructor() {
        super({key: 'init'});
    }

    preload(): void {
        this.loadAssets();
    }

    create(): void {
        this.gameHeight = this.scale.height;
        this.gameWidth = this.scale.width;
        this.addFixedBackground();
        this.addBgParallax(2);
        this.createHero();
        this.setCameras();
        this.map = this.add.tilemap('map');
        this.createTilesets();
        this.createWorldLayers();
        // this.createColliders();
        this.createSpooky();
        this.createColliders();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(): void {
        if(this.cursors.right.isDown){
            this.player.moveRight(false);
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

      private createColliders(): void {
        this.layers.groundLayer.setCollisionByProperty({ collides: true });
        this.layers.groundLayer.setCollisionBetween(1, 1000);
        this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
      }
}