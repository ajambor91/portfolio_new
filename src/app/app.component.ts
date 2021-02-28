import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from './components/canvas/service/component-communication.service';
import { info } from './data/console-data';
import { GenericHelper } from './helpers/generic.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  destroySheet = false;
  mobile: boolean
  wasConsoleOpen = false;

  private readonly minimalUserResponseInMiliseconds = 100;
  private readonly timeToShowConsoleInfo = 1500;

  constructor(private translate: TranslateService, private communicationService: ComponentCommunicationService) {}

  ngOnInit(): void {
    this.translateApp();
    this.checkIsMobile();
    this.startApp();
    this.checkOrientation();
  }

  private checkIsMobile(): void {
    this.mobile = GenericHelper.checkIsMobile();
  }

  private checkOrientation(): void {
    setInterval(() => {
      this.communicationService.orientation.next(GenericHelper.detectScreenOrientation());
    },50);
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
  @HostListener('document: keyup', ['$event'])
  private showConsoleMsg(event: KeyboardEvent): void {
    if(event.key === 'F12') {
      this.startTimeOut();
    }
    
  }
  @HostListener('window: context', ['$event', ])
  private showConsoleMsgByClick(event: Event): void{
    this.startTimeOut();
  }

  private startTimeOut(): void {
    if(this.wasConsoleOpen === true) {
      return;
    }
    this.wasConsoleOpen = true;
    let i = 0;

    const interval = setInterval(() => {
      console.log(`%c ${info[i]} `, 'background: #222; color: #bada55');
      i++;
      if(i > info.length - 1) {
        clearInterval(interval);
      }
    },this.timeToShowConsoleInfo);
  }
}