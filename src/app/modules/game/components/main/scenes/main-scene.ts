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
  backgroundTrees: Phaser.GameObjects.Image;
  groundLayer:Phaser.Tilemaps.TilemapLayer;
  grassLayer;
  treesLayer;
  treesGrassLayer;
  treesBackLayer;
  woodLayer;
  woodCollisionLayer;
  decorativeLayer;
  background: Phaser.GameObjects.Image;

  gameWidth: number;
  gameHeight: number;

  constructor() {
    super({ key: 'main' });

  }
  create() {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.background = this.add.image(this.gameWidth * 0.5, this.gameHeight * 0.5, 'background');
    //@ts-ignore
    this.background.fixedToCamera = true;
    this.addBgParallax(2);

    this.createHero();
    let i = 0;

    do {
      
      i++;
    } while (i< 16000)

    //@ts-ignore
    this.createCursors();
    this.setCameras();

    this.map = this.add.tilemap('map');
    const tiles = this.map.addTilesetImage('env_ground', 'tileset');  
    const tilesTrees = this.map.addTilesetImage('env_trees', 'tileset_trees'); // set tileset name
    const tilesWood = this.map.addTilesetImage('wood_env', 'tileset_wood'); // set tileset name
    const tilesDecorative = this.map.addTilesetImage('decorative_obj','tileset_decorative')
    this.groundLayer = this.map.createLayer('ground', tiles, 0,-200);  // set layer name
    this.woodLayer = this.map.createLayer('wood_decorative', tilesWood, 0, -200);
    this.woodCollisionLayer = this.map.createLayer('wood_collide', tilesWood, 0, -200);

    this.grassLayer = this.map.createLayer('grass', tiles, 0,-200);  // set layer name
    console.log(typeof this.groundLayer,'layer')
    this.treesLayer = this.map.createLayer('trees', tilesTrees, 0,-200);  // set layer name
    this.treesBackLayer = this.map.createLayer('trees_back', tilesTrees, 0, -200)
    this.treesGrassLayer = this.map.createLayer('trees_grass', tilesTrees, 0, -200);
    this.decorativeLayer = this.map.createLayer('decorative', tilesDecorative, 0, -200);
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.setCollisionBetween(1,1000);
    this.woodCollisionLayer.setCollisionByProperty({collides: true});
    this.woodCollisionLayer.setCollisionBetween(1,10000);
    this.physics.add.collider(this.player, this.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.woodCollisionLayer, null, null, this);
    //@ts-ignore
    this.background.fixedToCamera = true;
    // this.layer.resizeWorld();
    // this.player.setCollideWorldBounds(true);

    this.bullets = this.add.group();

  }
  preload() {
    this.loadAssets();
  }
  update() {
    this.createHeroMove();
    // this.background.setPosition(this.cameras.main.scrollX);
  }
  private createHero(): void {
    this.player = new Player(
      this,
      100, 
      60,
      'punk',
      "sprPlayer"
    ); 
  }



  

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain','/assets/game/main/mountain.png');
    this.load.image('angular', '/assets/game/collectibles/angular.png');
    this.load.image('ground', '/assets/game/main/ground.png');
    this.load.image('test', '/assets/game/main/test.png')
    this.load.spritesheet('punk', '/assets/game/main/punk_smaller.png',
      { frameWidth: 128,
        frameHeight: 112 });
    this.load.image('bullet', '/assets/game/main/bullets24.png');  
    // tiles in spritesheet 
    this.load.image('tileset', '/assets/game/main/env_ground.png');
    this.load.image('tileset_trees', '/assets/game/main/env_trees.png');
    this.load.image('tileset_wood', '/assets/game/main/wood_env.png');
    this.load.image('tileset_decorative', '/assets/game/main/decorative_obj.png');

    this.load.tilemapTiledJSON('map', '/assets/game/main/layers_map_terrain.json');
    

  }

  private setCameras(): void {

    this.cameras.main.setBounds(0, -300,16000 , 900)
    this.cameras.main.startFollow(this.player);
  }

  private createHeroMove(): void {
    if (this.cursors.right.isDown) {
      this.player.moveRight();
    }
    else if (this.cursors.left.isDown) {
      this.player.moveLeft();
    }
    else if(this.player.body.blocked.down) {
      this.player.stand();
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.jump();
    }
    if(this.cursors.space.isDown) {
      this.player.shoot();
    }

    this.background.setX(this.cameras.main.scrollX + 600);
  }

  private addBgParallax(count: number): void {
    let x = 0;
    do{
      //@ts-ignore
      const bg = this.add.image(x, this.gameHeight * 1.5,'mountain')
      .setOrigin(0,1)
      .setScrollFactor(1.25, 1);
      x += bg.width
    }while(x < 16000);
  }

  private createWorld(): void {
    
  }

}