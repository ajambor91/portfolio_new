import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { RectangleCoordsModel } from "../models/FigureCoords.model";
import { PointCoords } from "../models/point-coords.model";
import { MainFigure } from "./main-figure";

export class Rectangle extends MainFigure{

    coords: RectangleCoordsModel = {} as RectangleCoordsModel;

    constructor(canvasDimensions: CanvasDimensions, context: CanvasRenderingContext2D) {
        super(context, canvasDimensions);
        this.draw();
    }


    private draw(): void {
        const startPoint = this.firstPoint;
        const secondPoint = FigureHelper.getMinAndMax(startPoint, this.canvasDimensions);
        const [thirdPoint, fourthPoint] = FigureHelper.calcParralelLine(startPoint, secondPoint);
        this.coords = {
            firstPoint: startPoint,
            secondPoint: secondPoint,
            thirdPoint: thirdPoint,
            fourthPoint: fourthPoint
        };

        this.drawRectangle(startPoint, secondPoint, thirdPoint, fourthPoint);
    }
}