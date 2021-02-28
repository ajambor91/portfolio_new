import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';
import { ComponentCommunicationService } from '../canvas/service/component-communication.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements AfterViewInit {
  
  @ViewChild('navContainer') navContainer: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  
  Colors = Colors;
  isMenuShow = false;

  private readonly showMenuLeft = 170;
  private readonly hideMenuLeft = 375;
  private readonly intervalTime = 1;
  private readonly moveMenu = 4;
  
  private navHeight: number; 

  constructor(private communicationService: ComponentCommunicationService) { }


  ngAfterViewInit(): void {
    console.log('nav', this.nav.nativeElement.style)
    const navHeight = +window.getComputedStyle(this.nav.nativeElement).height.replace('px','')
    this.navHeight = navHeight;
    this.communicationService.navHeight.next(navHeight);
  }

  toggleMenu(): void {

    const toggleMenuInterval = setInterval(() => {
      this.navContainer.nativeElement.style.left = this.calcMenu(window.getComputedStyle(this.navContainer.nativeElement).left);
      if(this.isMenuShow === true && this.getRawValue( this.navContainer.nativeElement.style.left) >= this.hideMenuLeft ) {
        this.isMenuShow = false;
        clearInterval(toggleMenuInterval)
      } else if(this.isMenuShow === false && this.getRawValue( this.navContainer.nativeElement.style.left) <= this.showMenuLeft ){
        this.isMenuShow = true;
        clearInterval(toggleMenuInterval);
      }
    }, this.intervalTime);
  }

  private calcMenu(coord: any): string {
    if(this.isMenuShow === true) {
      return `${+coord.replace('px','') + this.moveMenu}px`
    }
    else{
      return `${+coord.replace('px','') - this.moveMenu}px`
    }
  }

  private getRawValue(coord: string): number {
    return +coord.replace('px','');
  }
  
}
