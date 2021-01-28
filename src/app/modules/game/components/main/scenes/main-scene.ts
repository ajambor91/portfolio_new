import { Bullet } from "../entities/objects/bullet";
import { Player } from "../entities/chars/player";


export class MainScene extends Phaser.Scene {
  // image = require ('../../../../../../assets/game/main/background.png');
  player = null
  platforms = null;
  cursors = null;
  jump = false;
  bullet = null;
  bullets;
  map;
  layer;
  constructor() {
    super({ key: 'main' });
  }
  create() {
    // this.createPlatforms();
    this.createHero();
    // this.createHeroAnims();
    // this.addBullets();
    this.createCursors();
    // this.setCameras();
    this.map = this.add.tilemap('map');
    const tiles = this.map.addTilesetImage('env_groundf', 'tileset');  // set tileset name
    this.layer = this.map.createLayer('ground', tiles, 0,-200);  // set layer name
    // this.layer.resizeWorld();
    console.log(this.cache.tilemap.get('map').data);

    console.log('tils',tiles)
    this.bullets = this.add.group();
  }
  preload() {
    this.loadAssets();
  }
  update() {
    this.createHeroMove();
  }
  private createHero(): void {
    this.player = new Player(
      this,
      1000, 
      600,
      'punk',
      "sprPlayer"
    ); 
  }



  

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('angular', '/assets/game/collectibles/angular.png');
    this.load.image('ground', '/assets/game/main/ground.png');
    this.load.image('test', '/assets/game/main/test.png')
    this.load.spritesheet('punk', '/assets/game/main/punk_stand.png',
      { frameWidth: 128 });
    this.load.image('bullet', '/assets/game/main/bullets24.png');  
    // tiles in spritesheet 
    this.load.image('tileset', '/assets/game/main/tiles.png');
    this.load.tilemapTiledJSON('map', '/assets/game/main/test_1_embed.json');
    

  }

  private setCameras(): void {
    this.cameras.main.startFollow(this.player);
  }

  private createHeroMove(): void {
    if (this.cursors.right.isDown) {
      this.player.moveRight();
      // if (this.player.body.touching.down) {
      //   this.player.anims.play('right', true);

      // }

    }
    else {
      if (this.player.body.touching.down) {
        // this.player.anims.play('stand', true);
      }
      // this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      // this.player.setVelocityY(-330);
      // this.player.anims.play('up', true);
      // this.jump = true;
    }
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    }
    else if(this.cursors.space.isDown) {
      this.player.shoot();
    }
  }

}