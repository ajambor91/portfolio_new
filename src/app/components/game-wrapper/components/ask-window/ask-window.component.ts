import { Component, EventEmitter, Output } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';
import { GameSettings } from 'src/app/models/game-settings.model';

@Component({
  selector: 'app-ask-window',
  templateUrl: './ask-window.component.html',
  styleUrls: ['./ask-window.component.scss']
})
export class AskWindowComponent {
  @Output() emitter: EventEmitter<GameSettings> = new EventEmitter<GameSettings>();

  Colors = Colors;

  set sound(option: boolean) {
    this._sound = option;
  }

  get sound(): boolean {
    return this._sound
  }

  set fullScreen(option: boolean) {
    this._fullScreen = option;
  }

  get fullScreen(): boolean {
    return this._fullScreen;
  }

  private _sound = true;
  private _fullScreen = true;

  play(): void {
    const settings: GameSettings = {
      sound: this.sound,
      fullScreen: this.fullScreen
    };
    this.emitter.emit(settings);
  }
}
