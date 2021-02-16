import { Spooky } from "../entities/chars/enemies/spooky";
import { Player } from "../entities/chars/player";
import { tilesetNames, layerNames } from "../data/maps";
import { Layer } from "../model/layer.model";
import { Tileset } from "../model/tileset.model";
import { Cursors } from "../model/cursors.model";
import { Depth } from "../enums/depth.enum";
import { SoundsAudio } from "../model/sounds.model";
import { Entity } from "../entities/entity";
import { SoundSource } from "../model/sound-sources.model";
import { CharsSound } from "../model/chars-sound.model";
import { TypeHelper } from "../helpers/type-helper";

export abstract class Scene extends Phaser.Scene {

  protected readonly layerYPosition = -200;
  protected player: Player;
  protected gameWidth: number;
  protected gameHeight: number;
  protected spooky: Spooky;
  protected layers: Layer;
  protected map: Phaser.Tilemaps.Tilemap;
  protected audio: Phaser.Sound.BaseSound;
  protected audioMute = false;
  protected cursors: Cursors;
  protected name: string;
  protected sounds: SoundsAudio = {};
  protected charsSounds: CharsSound = {};
  protected soundSources: SoundSource[] = [];


  private background: Phaser.GameObjects.Image;
  private tilesets: Tileset;

  constructor(key) {
    super(key);
  }

  protected addFixedBackground(): void {
    this.background = this.add.image(this.gameWidth * 0.5, this.gameHeight * 0.5, 'background')
      .setScrollFactor(0, 0);
  }

  protected addBgParallax(worldWidth = 24000): void {
    let x = 0;
    do {
      const bg = this.add.image(x, this.gameHeight * 1.5, 'mountain')
        .setOrigin(0, 1)
        .setScrollFactor(1.25, 1);
      x += bg.width
    } while (x < worldWidth);
  }

  protected setCameras(worldWidth = 16000): void {
    this.cameras.main.setBounds(0, -300, worldWidth, 900)
    this.cameras.main.startFollow(this.player);
  }

  protected createHero(): void {
    this.player = new Player(
      this,
      60,
      -60,
      this.name === 'MainScene' ? 'punk_gun' : 'punk',
      "sprPlayer"
    );
    this.name === 'MainScene' ? this.player.heroAnimsWithGun() : this.player.createHeroAnims()
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
    this.tilesets = null;
    this.tilesets = {} as Tileset;
    for (let key in tilesetNames) {
      if (tilesetNames[key].scenes.includes(this.name)) {
        this.tilesets[key] = this.map.addTilesetImage(tilesetNames[key].tilesetName, tilesetNames[key].tilesetKey);
      }
    }
  }

  protected createWorldLayers(xPosition = 0): void {
    this.layers = {} as Layer;
    for (let key in layerNames) {
      if (layerNames[key].scenes.includes(this.name)) {
        this.layers[key] = this.map.createLayer(layerNames[key].name, this.tilesets[layerNames[key].tilesetKey], xPosition, this.layerYPosition)
          .setDepth(layerNames[key].depth);
      }
    }
  }

  protected loadTilesets(): void {
    for (let key in tilesetNames) {
      if (tilesetNames[key].scenes.includes(this.name)) {
        this.load.image(tilesetNames[key].tilesetKey, tilesetNames[key].path);
      }
    }
  }

  protected loadAudio() {
    this.load.audio('theme', '/assets/game/audio/psyhematics.mp3');
  }

  protected loadUniAssets(): void {
    this.load.image('sound_on', '/assets/game/main/ux_icons/sound_on.png');
    this.load.image('sound_off', '/assets/game/main/ux_icons/sound_off.png');
    this.load.bitmapFont('font', '/assets/game/main/fonts/cosmic_0.png', '/assets/game/main/fonts/cosmic.xml');

  }

  protected addSoundsBTN(): void {
    const soundOn = this.add.image(1160, 40, !this.audioMute ? 'sound_on' : 'sound_off')
      .setScrollFactor(0, 0)
      .setDepth(Depth.Texts)
      .setInteractive({ useHandCursor: true });
    soundOn.on('pointerdown', (e) => {
      if (this.audioMute === false) {
        // @ts-ignore
        this.sound.mute = true;
        soundOn.setTexture('sound_off');
        this.audioMute = true;
      }
      else {
        //@ts-ignore
        this.sound.mute = false;
        soundOn.setTexture('sound_on');
        this.audioMute = false;
      }
    });

  }

  protected playAudio(): void {
    this.audio = this.sound.add('theme');
    //@ts-ignore
    if (this.audioMute === true) this.sound.mute = true;
    // this.sound.mute = true; 
    this.audio.play();
    //@ts-ignore
    this.audio.setLoop(true);
  }

  protected playSound(key: string, source: Entity, main = false, loop = false): void {
    //@ts-ignore
    if (main === false) {
      let playing = false;
      const timeEvent = this.time.addEvent({
        delay: 1,
        callback: () => {
          if (TypeHelper.isNotUndefined(this.charsSounds[key]) && TypeHelper.isNotUndefined(this.charsSounds[key][source.id]) && playing === false) {
            playing = true;
            const volume = this.calcVolume(source);
            //@ts-ignore
            this.charsSounds[key][source.id].setVolume(volume);
            //@ts-ignore
            this.charsSounds[key][source.id].setLoop(loop);
            this.charsSounds[key][source.id].play();
            const index =this.checkIsSoundExists(key, source.id)
            if(typeof index === 'number' ) {
              this.soundSources[index] = {
                key: key,
                entity: source
              };
            }
            else{
              this.soundSources.push({ key: key, entity: source });
            }
            this.time.removeEvent(timeEvent);
        
          }
        },
        loop: true
      })
    } else {
      const volume = this.calcVolume(source);
      //@ts-ignore
      this.sounds[key].setVolume(volume);
      //@ts-ignore
      this.sounds[key].setLoop(loop);
      this.sounds[key].play();
    }

  }

  protected changeVolume(): void {
    let i = 0;
    const soundSourceLength = this.soundSources.length - 1;
    for (i; i < soundSourceLength; i++) {
      const item = this.soundSources[i];

      if (TypeHelper.isNotUndefined(this.charsSounds[item.key]) &&
        TypeHelper.isNotUndefined(this.charsSounds[item.key][item.entity.id])) {
          //@ts-ignore
          const volume = this.calcVolume(this.soundSources[i].entity);
        //@ts-ignore
        this.charsSounds[item.key][item.entity.id].setVolume(volume);
      }
    }
  }

  private calcVolume(source: Entity): number {
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, source.x, source.y) / 100;
    const volume = parseFloat((1 - Math.pow(distance, 2) / 100).toFixed(2));
    return volume < 0 ? 0 : volume;
  }

  private checkIsSoundExists(soundKey: string, entityId: string): boolean | number{
    let i = 0;
    const soundSourceLength = this.soundSources.length - 1;
    for (i; i < soundSourceLength; i++){
      if(this.soundSources[i].key === soundKey && this.soundSources[i].entity.id === entityId){
        return i;
      }
    }
    return false;
  }
}