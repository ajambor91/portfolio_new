import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';
import { SoundService } from 'src/app/service/sound.service';
import { ComponentCommunicationService } from '../canvas/service/component-communication.service';
import { explode } from './explode';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  @ViewChild('sheet')sheet: ElementRef;
  Colors = Colors;
  isExisting = true;
  constructor(private communiactionService: ComponentCommunicationService,private soundService: SoundService) { }

  ngOnInit(): void {
  }

  startApp(): void {
    explode(this.sheet);
    // this.communiactionService.appStart.next(true);
    // this.soundService.playAudio();
    // this.isExisting = false;
  }


}
