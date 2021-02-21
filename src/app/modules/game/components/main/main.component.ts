import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
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
export class MainComponent implements OnChanges, AfterViewInit {

  @ViewChild('fs')fs: ElementRef;

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  fullScreen: boolean;
  sound: boolean;
  size: ScreenSize;

  constructor() {
  }
  ngAfterViewInit(): void {
    this.fs.nativeElement.style.width = `${this.size.width}px`;
    this.fs.nativeElement.style.height = `${this.size.height}px`;
    this.createPhaserGame();
    this.phaserGame = new Phaser.Game(this.config);
  }
  ngOnChanges() {
   
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
        parent: 'game',
        mode: Phaser.Scale.ScaleModes.FIT,
        width: 1200,
        height: 674
        // autoCenter: Phaser.Scale.,
      },
      audio: {
        disableWebAudio: true
      }, callbacks: {
        preBoot: (phaserGame) => {
          phaserGame.registry.merge({
            data: {
              fullScreen: this.fullScreen,
              sound: this.sound
            }
          })
        }
      }
    };
  }


}