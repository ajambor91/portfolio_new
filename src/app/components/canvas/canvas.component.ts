import { OnDestroy, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FigureEnum } from './enums/figure.enum';
import { MainFigure } from './figures/main-figure';
import { Rectangle } from './figures/rectangle';
import { Triangle } from './figures/triangle';
import { CanvasDimensions } from './models/canvas-dimension.model';


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
  private readonly createFigureTime = 7000;
  private figuresInterval;

  constructor() { }
 

  ngOnInit(): void {
    this.setCanvasSize();
  }

  ngAfterViewInit(): void {
    this.getContext();
    this.addFigures();
  }

  ngOnDestroy(): void {
    clearInterval(this.figuresInterval);
  }

  private setCanvasSize(): void {
    this.innerHeight = window.innerHeight;
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
    new Rectangle(this.canvasDimension, this.context);
    this.figuresInterval = setInterval(() => {
      this.selectFigure() === FigureEnum.Rectangle ?
       new Rectangle(this.canvasDimension, this.context) :
       new Triangle(this.canvasDimension, this.context) 
    }, this.createFigureTime);
    // new Rectangle(this.canvasDimension, this.context)
  }

  private selectFigure(): FigureEnum {
    return Math.ceil(Math.random() * 2) - 1; 
  }







 



}
