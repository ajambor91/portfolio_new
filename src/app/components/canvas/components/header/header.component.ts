import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { texts } from './data/header-texts';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('header') header: ElementRef;
  private readonly startSpeed = 10000;
  private readonly headerText = 'Hej'
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.addMainText();
  }

  private addTexts(): void {

  }

  private addMainText(): Promise<boolean> {
    return new Promise(resolve => {
      let i = 0;
      (function addMainTextInterval(i, context) {
        setTimeout(() => {
          context.header.nativeElement.textContent += texts.headerFirst[i];
          i++
          if (i < texts.headerFirst.length) {
            addMainTextInterval(i, context);
          }else{
            resolve(true);
          }
        }, context.calcSpeed());
      })(i, this);
    })
  }

  private calcSpeed(): number {
    return Math.sqrt(this.startSpeed);
  }
}
