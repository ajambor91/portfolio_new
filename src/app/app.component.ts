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
export class AppComponent {
  title = 'portfoliofront';
  destroySheet = false;
  mobile: boolean

  private readonly screenWidth = 1366;

  constructor(private translate: TranslateService, private communicationService: ComponentCommunicationService) {
    this.translateApp();
    this.checkIsMobile();
    this.startApp();
 
  }

  private checkIsMobile(): void {
    if (window.screen.width >= this.screenWidth) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  private translateApp(): void {
    this.translate.addLangs(['pl','en'])
    this.translate.setDefaultLang('pl')
    this.translate.use('pl');
  }

  private startApp(): void {
    const subscribe$ = this.communicationService.appStart.subscribe(res => {
      if (res === true) {
        this.destroySheet = true;
        subscribe$.unsubscribe();
      }
    });
  }
}