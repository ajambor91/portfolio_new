import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  audio;

  constructor() { 
    this.loadAudio();
  }

  loadAudio(): void {
    this.audio = new Audio();
    this.audio.src = "/assets/theme.mp3";
    this.audio.load();
  }

  playAudio(): void {
    this.audio.play();
    this.audio.loop = true;
  }

  stopAudio(): void {
    this.audio.pause();
  }
}
