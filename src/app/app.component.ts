import { Compiler, ElementRef, HostListener, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from './components/canvas/service/component-communication.service';
import { GameModule } from './modules/game/game.module';
import { SoundService } from './service/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'portfoliofront';
  destroySheet = false;
  constructor( private translate: TranslateService, private communicationService: ComponentCommunicationService) {
    this.translate.addLangs(['pl'])
    this.translate.setDefaultLang('pl')
    this.translate.use('pl');
    const subscribe$ = this.communicationService.appStart.subscribe(res => {
      if(res === true) {
        this.destroySheet = true;
        subscribe$.unsubscribe();
      }
    });
   }
}