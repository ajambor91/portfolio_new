import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Colors } from 'src/app/helpers/color.helpers';
import { ComponentCommunicationService } from '../canvas/service/component-communication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {

  @ViewChild('nav') nav: ElementRef;
  Colors = Colors;
  constructor(private communicationService: ComponentCommunicationService) { }

  ngAfterViewInit(): void {
    this.sendNavHeight();
  }

  private sendNavHeight(): void {
    const navHeight = this.getNavbarHeighr();
    this.communicationService.navHeight.next(navHeight);
  }

  private getNavbarHeighr(): number {
    return +window.getComputedStyle(this.nav.nativeElement).height.replace('px','');
  }
}
