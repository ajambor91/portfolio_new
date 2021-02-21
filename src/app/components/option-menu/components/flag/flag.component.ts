import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent{

  constructor() { }
  isPolish = true;
  toggleLanguage(): void {
    this.isPolish = !this.isPolish;
  }

}
