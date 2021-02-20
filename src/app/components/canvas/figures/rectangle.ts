import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { ComponentCommunicationService } from "../service/component-communication.service";
import { MainFigure } from "./main-figure";

export class Rectangle extends MainFigure{

    constructor(canvasDimensions: CanvasDimensions, context: CanvasRenderingContext2D, communicationService: ComponentCommunicationService) {
        super(context, canvasDimensions, communicationService);
        this.draw();
    }

    private draw(): void {
        const startPoint = this.firstPoint;
        const secondPoint = FigureHelper.getMinAndMax(startPoint, this.canvasDimensions);
        const [thirdPoint, fourthPoint] = FigureHelper.calcParralelLine(startPoint, secondPoint);    
        this.drawRectangle(startPoint, secondPoint, thirdPoint, fourthPoint);
    }
}