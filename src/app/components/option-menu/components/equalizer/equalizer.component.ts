import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/service/sound.service';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements OnInit {
  soundOn = true;
  constructor(private soundService: SoundService) { }

  ngOnInit(): void {
  }

  toggleSound(): void {
    console.log('toogl')
    this.soundOn = !this.soundOn;
    if(this.soundOn === true) {
      this.soundService.playAudio();
      console.log(this.soundOn)
    }else{
      this.soundService.stopAudio();
      console.log(this.soundOn)
    }
  }

}
