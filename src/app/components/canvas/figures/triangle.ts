import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { MainFigure } from "./main-figure";

export class Triangle extends MainFigure {

    constructor(canvasDimensions: CanvasDimensions, context: CanvasRenderingContext2D) {
        super(context, canvasDimensions);
        this.draw();
    }

    private draw(): void {
        const startPoint = this.firstPoint;
        const secondPoint = FigureHelper.getMinAndMax(startPoint, this.canvasDimensions);
        const thirdPoint = FigureHelper.getMinAndMax(secondPoint, this.canvasDimensions);
        this.drawTriangle(startPoint, secondPoint, thirdPoint);
    }
}