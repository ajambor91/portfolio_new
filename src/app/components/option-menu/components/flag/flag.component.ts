import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent{

  constructor(private translateService: TranslateService) { }
  isPolish = true;
  toggleLanguage(): void {
    this.isPolish = !this.isPolish;
    this.translateService.use(this.isPolish === true ? 'pl' : 'en');
  }

}
