import { OnDestroy, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenOrientationEnum } from 'src/app/enums/screen-orientation.enum';
import { FigureEnum } from './enums/figure.enum';
import { Rectangle } from './figures/rectangle';
import { Triangle } from './figures/triangle';
import { CanvasDimensions } from './models/canvas-dimension.model';
import { ComponentCommunicationService } from './service/component-communication.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit,OnDestroy {

  @ViewChild('canvas') canvas: ElementRef;

  innerWidth: number;
  innerHeight: number;
  context: CanvasRenderingContext2D;

  private navbarHeight: number;
  private canvasDimension: CanvasDimensions;
  private communicationService$: Subscription;
  private orientation: ScreenOrientationEnum;
  private firstValue = true;

  constructor(private communicationService: ComponentCommunicationService) { }
 

  ngOnInit(): void {
    this.setCanvasSize();
  }

  ngAfterViewInit(): void {
    this.getContext();
    this.addFigures();
  }

  ngOnDestroy(): void {
    this.communicationService$.unsubscribe();
  }

  private setCanvasSize(): void {
    const nabarHeight$ = this.communicationService.navHeight.subscribe( res => {
      this.innerHeight = window.innerHeight - res;
      this.navbarHeight = res;
      this.innerWidth = window.innerWidth;
    });
    
    this.communicationService.orientation.subscribe(res => {
      this.innerHeight = window.innerHeight - (res === ScreenOrientationEnum.Portrait && this.navbarHeight);
      this.innerWidth = window.innerWidth;
    });
    this.canvasDimension = {
      width: this.innerWidth,
      height: this.innerHeight
    };
  }
  
  private getContext(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.translate(.5, .5);

  }

  private addFigures(): void {
    new Rectangle(this.canvasDimension, this.context, this.communicationService);
    this.communicationService$ = this.communicationService.drawing.subscribe( (res: boolean) => {
      if(res === true){
        this.selectFigure() === FigureEnum.Rectangle ?
        new Rectangle(this.canvasDimension, this.context, this.communicationService) :
        new Triangle(this.canvasDimension, this.context, this.communicationService) 
      }
    });
  }

  private selectFigure(): FigureEnum {
    return Math.ceil(Math.random() * 2) - 1; 
  }







 



}
