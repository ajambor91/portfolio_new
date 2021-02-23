import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from './components/canvas/service/component-communication.service';
import { GenericHelper } from './helpers/generic.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  destroySheet = false;
  mobile: boolean

  constructor(private translate: TranslateService, private communicationService: ComponentCommunicationService) {}

  ngOnInit(): void {
    this.translateApp();
    this.checkIsMobile();
    this.startApp();
  }

  private checkIsMobile(): void {
    this.mobile = GenericHelper.checkIsMobile();
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