import { Player } from "../entities/chars/player";
import { layerNames, tilesetNames } from "./key-name/keys";
import { Layer } from "./model/layer.model";
import { Tileset } from "./model/tileset.model";

export class MainScene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  map: Phaser.Tilemaps.Tilemap;

  layers: Layer;
  tilesets: Tileset;
  background: Phaser.GameObjects.Image;

  gameWidth: number;
  gameHeight: number;

  private readonly layerYPosition = -200;

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
    this.loadTilesets();
    this.load.tilemapTiledJSON('map', '/assets/game/main/layers_map_terrain.json');
  }

  private loadTilesets(): void {
    for (let key in tilesetNames){
      this.load.image(tilesetNames[key].tilesetKey, tilesetNames[key].path);
    }
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
    //@ts-ignore
    else if(this.player.body.blocked.down) {
      this.player.stand();
    }
    //@ts-ignore
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
      const bg = this.add.image(x, this.gameHeight * 1.5,'mountain')
      .setOrigin(0,1)
      .setScrollFactor(1.25, 1);
      x += bg.width
    }while(x < 16000);
  }

  private createTilesets(): void {
    this.tilesets = {} as Tileset;
    for (let key in tilesetNames){
      this.tilesets[key] = this.map.addTilesetImage(tilesetNames[key].tilesetName, tilesetNames[key].tilesetKey)
    }
  }
  
  private createWorldLayers(): void {
    this.layers = {} as Layer;
    for (let key in layerNames){
      this.layers[key] = this.map.createLayer(layerNames[key].name, this.tilesets[layerNames[key].tilesetKey], 0, this.layerYPosition);
    }
  }

  private createColliders(): void {
    this.layers.groundLayer.setCollisionByProperty({ collides: true });
    this.layers.groundLayer.setCollisionBetween(1,1000);
    this.layers.woodCollisionLayer.setCollisionByProperty({collides: true});
    this.layers.woodCollisionLayer.setCollisionBetween(1,10000);
    this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.layers.woodCollisionLayer, null, null, this);
  }

  private addFixedBackground(): void {
    this.background = this.add.image(this.gameWidth * 0.5, this.gameHeight * 0.5, 'background')
                                .setScrollFactor(1,1);
  }
}