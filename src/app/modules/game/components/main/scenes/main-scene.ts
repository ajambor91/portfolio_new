import { SoundsAudio } from "../model/sounds.model";
import { Scene } from "./scene";
import { sounds } from "../data/sounds";
import { enemies, enemiesSpr } from "../data/enemies";
import { Enemy } from "../model/enemy.model";
import { Depth } from "../enums/depth.enum";

export class MainScene extends Scene {
  rightOutside = false;
  playerHealth: Phaser.GameObjects.BitmapText;
  magazine: Phaser.GameObjects.BitmapText;
  spookyPosition: number;
  displayReload = false;
  reloadedText: Phaser.GameObjects.BitmapText;
  sounds: SoundsAudio;
  enemies: Enemy;
  isTowerShow = false;
  cameraMoved = false;
  protected readonly name = 'MainScene';

  constructor() {
    super({ key: 'main' });

  }
  init(data){
    this.audioMute = data.audioMute;
  }
  create() {
    this.gameHeight = this.scale.height;
    this.gameWidth = this.scale.width;
    this.addFixedBackground();
    this.addBgParallax();
    this.createHero();
    this.createCursors();
    this.setCameras();
    this.map = this.add.tilemap('mapMain');
    this.createTilesets();
    this.createWorldLayers();
    this.createColliders();
    this.createSpooky();
    this.playerHealth = this.add.bitmapText(10, 10, 'font', '100 HP')
      .setScrollFactor(0, 0)
      .setDepth(Depth.Texts);
    this.magazine  = this.add.bitmapText(150,10, 'font', `${this.player.magazine} AMMO`)
      .setScrollFactor(0,0)
      .setDepth(Depth.Texts);
    setInterval(() => {
      this.player.isShooting = false;
    }, this.player.rateOfFire);
    this.addSoundsBTN();
    this.playAudio();
    this.addSounds();
    this.addEnemies();
  }

  preload() {
    this.loadAudio(); // do wyrzcuenia poem
    this.loadAssets();
    this.loadUniAssets();
    this.loadSounds();
  }

  update() {
    if( this.player.x < 0 && this.rightOutside === false){
      this.sounds.fallingDown.play();
      this.player.destroy();
      this.rightOutside = true;
    } 
    if(this.player.x < 0) {
      this.spooky.unfollow();
      return;
    }
    if(this.player.x > 11850 && this.isTowerShow === false){
      // console.log(this.player.x)
      // this.showTower();
    } else if((this.player.x < 11850 || this.player.x > 14000) && this.isTowerShow === true){
      this.hideTower();
    }
    //@ts-ignore
    this.spooky.addPlayerCollision();
    this.playerHealth.text = `${this.player.health.toFixed(0)} HP`;
    // this.player.checkIsAlive();
    if (this.player.active) {
      this.createHeroMove();
    }
    this.spookyPosition = this.spooky.followPlayer(this.spookyPosition);
  }

  private createCursors(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.rKey= this.input.keyboard.addKey('R'); 
  }
  private loadAssets(): void {
    this.load.image('background', '/assets/game/main/background.png');
    this.load.image('mountain', '/assets/game/main/mountain.png');
    this.load.image('angular', '/assets/game/collectibles/angular.png');
    this.load.image('ground', '/assets/game/main/ground.png');
    this.load.image('test', '/assets/game/main/test.png')
    this.load.spritesheet('punk_gun', '/assets/game/main/punk_gun.png',
      {
        frameWidth: 130,
        frameHeight: 128
      });
    this.load.image('bullet', '/assets/game/main/bullet_8.png');
    this.load.spritesheet('cannon_bullet', '/assets/game/main/cannon_bullet.png', {
      frameWidth: 50
    });

    
    this.loadTilesets();
    this.load.tilemapTiledJSON('mapMain', '/assets/game/main/layers_map_terrain.json');
    this.load.spritesheet('spooky', '/assets/game/chars/enemies/spooky.png', {
      frameWidth: 49,
      frameHeight: 72
    });
    this.load.image('reload_big', '/assets/game/main/keyboard_icons/reload_big.png');
    
    this.loadEnemies();

  }

  private createHeroMove(): void {
    if (this.cursors.right.isDown) {
      this.player.rateOfFire += 300;
      //@ts-ignore
      this.player.moveRight(!this.player.body.blocked.down);
    }
    else if (this.cursors.left.isDown) {
      //@ts-ignore
      this.player.moveLeft(!this.player.body.blocked.down);
    }
    //@ts-ignore
    else if (this.player.body.blocked.down) {
      this.player.stand();
    }
    //@ts-ignore
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.jump();
      //@ts-ignore
    } else if (!this.player.body.blocked.down && !this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.jumpStatic();
    }
    if (this.cursors.space.isDown) {
      if (!this.player.isShooting) {
        this.player.shoot();
        this.magazine.text = `${this.player.magazine} AMMO`;
        this.player.isShooting = true;
      }
    }
    if (this.cursors.rKey.isDown){
      this.player.reload();
    }
  }

  private createColliders(): void {
    this.layers.groundLayer.setCollisionByProperty({ collides: true });
    this.layers.groundLayer.setCollisionBetween(1, 1000);
    this.layers.woodCollisionLayer.setCollisionByProperty({ collides: true });
    this.layers.woodCollisionLayer.setCollisionBetween(1, 10000);
    this.layers.monsterCollideLayer.setCollisionBetween(1,10000);
    this.layers.monsterCollideLayer.setCollisionByProperty({collides: true});
    this.physics.add.collider(this.player, this.layers.groundLayer, null, null, this);
    this.physics.add.collider(this.player, this.layers.woodCollisionLayer, null, null, this);
  }

  private loadSounds(): void {

    for (let [key,value] of Object.entries(sounds)){
      this.load.audio(value.key, value.path);
    }
  }

  private addSounds(): void {
    this.sounds = {} as SoundsAudio;
    for (let [key, value] of Object.entries(sounds)){
      this.sounds[key] = this.sound.add(value.key);
    }
  }

  private loadEnemies(): void {
    for (let [key, value] of Object.entries(enemiesSpr)){
      this.load.spritesheet(value.key, value.path, {
        frameWidth: value.width,
        frameHeight: value.height
      });
    }
  }

  private addEnemies(): void {
    this.enemies = {} as Enemy;
    for(let [key, value] of Object.entries(enemies)){
      this.enemies[key] = new value.class(
        this,
        value.xPosition,
        value.yPosition,
        value.key,
        value.type
      );
    }
    
  }

  private cameraMove(): void {
    console.log('moveCamera', this.cameras.main.x)

   
  }
  private showTower(): void {
    // console.log('camera position x',this.cameras.main.x)
    let firstBound = this.player.x - this.gameWidth / 2;
    let secondBound = 12400;
    const scroll = 3;
    const endBound = 11800;
    const cameraMove = setInterval(()=> {
      // this.cameras.main.setBounds(firstBound, -300, secondBound, 900);
      this.cameras.main.x = firstBound;
      // firstBound += scroll;
      secondBound += scroll;

      // console.log('moveCamera', firstBound)
      if(firstBound >= endBound){
        clearInterval(cameraMove)
      }
    },5);
    this.isTowerShow = true;
  }

  private hideTower(): void {
    this.cameras.main.setBounds(0, -300, 16000, 900)
    this.isTowerShow = false;
  }
}