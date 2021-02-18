import { Component, OnChanges, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { ScreenSizeHelper } from './helpers/screen-size.helper';
import { ScreenSize } from './model/screen-size.model';

import { InitScene } from './scenes/init-scene';
import { MainScene } from './scenes/main-scene';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnChanges {


  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  fullScreen: boolean;
  screenSize: ScreenSize;

  constructor() {

    this.screenSize = ScreenSizeHelper.calcDefaultSize();
    console.log(this.screenSize)
  }

  ngOnChanges() {
    this.createPhaserGame();
    this.phaserGame = new Phaser.Game(this.config);
  }

  private createPhaserGame(): void {
    this.config = {

      type: Phaser.AUTO,

      scene: [InitScene, MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          width: 24000
        }
      },
      scale: {
        parent: 'fullscreen',
        mode: Phaser.Scale.FIT,
        width: window.screen.width,
        height: window.screen.height
        // autoCenter: Phaser.Scale.,
      },
      audio: {
        disableWebAudio: true
      }, callbacks: {
        preBoot: (phaserGame) => {
          phaserGame.registry.merge({
            data: {
              fullScreen: this.fullScreen
            }
          })
        }
      }
    };
  }


}