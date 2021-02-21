import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements OnInit {
  soundOn = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSound(): void {
    this.soundOn = !this.soundOn;
  }

}
