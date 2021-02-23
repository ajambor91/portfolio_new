import { OnDestroy, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  private canvasDimension: CanvasDimensions;
  private communicationService$: Subscription;

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
    const nabarHeight = this.communicationService.navHeight.value;
    this.innerHeight = window.innerHeight - nabarHeight;
    this.innerWidth = window.innerWidth;
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
    // this.communicationService$ = this.communicationService.drawing.subscribe( (res: boolean) => {
    //   if(res === true){
    //     this.selectFigure() === FigureEnum.Rectangle ?
    //     new Rectangle(this.canvasDimension, this.context, this.communicationService) :
    //     new Triangle(this.canvasDimension, this.context, this.communicationService) 
    //   }
    // });

    // new Rectangle(this.canvasDimension, this.context)
  }

  private selectFigure(): FigureEnum {
    return Math.ceil(Math.random() * 2) - 1; 
  }







 



}
