import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MainFigure } from './figures/main-figure';
import { Rectangle } from './figures/rectangle';
import { Triangle } from './figures/triangle';
import { CanvasDimensions } from './models/canvas-dimension.model';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  innerWidth: number;
  innerHeight: number;
  context: CanvasRenderingContext2D;

  private canvasDimension: CanvasDimensions;
  private figures: MainFigure[] = [];
  private figuresInterval;

  constructor() { }

  ngOnInit(): void {
    this.setCanvasSize();
  }

  ngAfterViewInit(): void {
    this.getContext();
    this.addFigures();
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
    let i = 0;
    this.figuresInterval = setInterval(() => {
      this.figures.push(new Rectangle(this.canvasDimension, this.context));
    }, 2500)
    // new Rectangle(this.canvasDimension, this.context)
  }







 



}
