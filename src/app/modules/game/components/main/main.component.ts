import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { InitScene } from './scenes/init-scene';
import { MainScene } from './scenes/main-scene';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit  {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 500,
      width: 1200,
      scene: [ InitScene,MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 }
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      audio: {
        disableWebAudio: true
    }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
