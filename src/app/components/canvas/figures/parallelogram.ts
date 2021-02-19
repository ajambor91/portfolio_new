import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { PointCoords } from "../models/point-coords.model";
import { MainFigure } from "./main-figure";

export class Parallelogram extends MainFigure{

    constructor(canvasDimensions: CanvasDimensions, context: CanvasRenderingContext2D) {
        super(context, canvasDimensions);
        this.drawRectangle();
    }

    private drawRectangle(): void {
        const start = this.firstPoint;
        const secondPoint = FigureHelper.getMinAndMax(start, this.canvasDimensions);
        const points = this.calcParralelLine(start, secondPoint);
        this.drawLine(start, secondPoint).then(res => {
            this.drawLine(secondPoint, points[0]).then(res => {
                this.drawLine(points[0], points[1]).then(res => {
                    this.drawLine(points[1], start)
                })
            })
        })
        console.log('start', start)
    }

    private calcParralelLine(firstPoint: PointCoords, secondPoint: PointCoords): PointCoords[] {
        const dx = firstPoint.x - secondPoint.x;
        const dy = firstPoint.y - secondPoint.y;
        const distance = Math.sqrt(Math.pow(firstPoint.x - secondPoint.x, 2) + Math.pow(firstPoint.y - secondPoint.y, 2));
        const udx = dx / distance;
        const udy = dy / distance;
        const px = -udy;
        const py = udx
        const nx = firstPoint.x - udy * distance;
        const ny = firstPoint.y + udx * distance;
        const sx = nx + dx;
        const sy = ny + dy;
        return [
            { x: nx, y: ny },
            { x: sx, y: sy }
        ];
    }
}