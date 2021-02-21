import { Compiler, ElementRef, HostListener, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GameModule } from './modules/game/game.module';
import { SoundService } from './service/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'portfoliofront';

  constructor( private translate: TranslateService) {
    this.translate.addLangs(['pl'])
    this.translate.setDefaultLang('pl')
    this.translate.use('pl');
   }
}