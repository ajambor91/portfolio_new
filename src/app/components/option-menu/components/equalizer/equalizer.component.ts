import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/service/sound.service';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent {
  soundOn = true;
  constructor(private soundService: SoundService) { }

  toggleSound(): void {
    this.soundOn = !this.soundOn;
    if(this.soundOn === true) {
      this.soundService.playAudio();
    }else{
      this.soundService.stopAudio();
    }
  }

}
