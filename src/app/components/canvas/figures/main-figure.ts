import { BehaviorSubject } from "rxjs";
import { Condition } from "../classes/condition";
import { ColorHelper } from "../helpers/color.helpers";
import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { PointCoords } from "../models/point-coords.model";
import { ComponentCommunicationService } from "../service/component-communication.service";
export abstract class MainFigure {

    protected canvasDimensions: CanvasDimensions;
    protected context: CanvasRenderingContext2D;
    protected firstPoint: PointCoords;

    private readonly lineTimeRatio = 1;
    private color: string;

    constructor(context: CanvasRenderingContext2D,
         canvasDimensions: CanvasDimensions,
         private communicationService: ComponentCommunicationService) {
        this.context = context;
        this.canvasDimensions = canvasDimensions;
        this.getFirstPoint();
        this.color = ColorHelper.returnRanomdColor();
    }

    protected drawRectangle(startPoint: PointCoords, secondPoint: PointCoords, thirdPoint: PointCoords, fourthPoint: PointCoords): void {
        this.communicationService.drawing.next(false);
        this.drawLine(startPoint, secondPoint).then(res => {
            this.drawLine(secondPoint, thirdPoint).then(res => {
                this.drawLine(thirdPoint, fourthPoint).then(res => {
                    this.drawLine(fourthPoint, startPoint).then( res => {
                        this.communicationService.drawing.next(true);
                    });
                });
            });
        });
    }

    protected drawTriangle(startPoint: PointCoords, secondPoint: PointCoords, thirdPoint: PointCoords): void {
        this.drawLine(startPoint, secondPoint).then(res => {
            this.drawLine(secondPoint, thirdPoint).then(res => {
                this.drawLine(thirdPoint, startPoint).then(res => {
                    this.communicationService.drawing.next(true);
                });
            });
        });
    }

    protected drawLine(startPoint: PointCoords, targetPoint: PointCoords): Promise<boolean> {
        const condition = new Condition();
        this.context.beginPath();
        startPoint.x = +Math.abs(startPoint.x).toFixed(2);
        startPoint.y = +Math.abs(startPoint.y).toFixed(2);
        targetPoint.x = +Math.abs(targetPoint.x).toFixed(2);
        targetPoint.y = +Math.abs(targetPoint.y).toFixed(2);
        if (startPoint.x > targetPoint.x) {
            condition.operatorX = '<=';
        } else if (startPoint.x < targetPoint.x) {
            condition.operatorX = '>=';
        }
        if (startPoint.y > targetPoint.y) {
            condition.operatorY = '<=';
        } else if (startPoint.y < targetPoint.y) {
            condition.operatorY = '>=';
        }
        this.context.moveTo(startPoint.x, startPoint.y);
        const waypoints = FigureHelper.calcWayPoints(startPoint, targetPoint);
        let i = 0;
        return new Promise(resolve => {
            const drawInterval = setInterval(() => {
                this.context.lineTo(waypoints[i].x, waypoints[i].y);
                this.context.lineCap = 'round';
                this.context.strokeStyle = this.color;
                this.context.lineWidth = 3;
                this.context.stroke();
                i++
                if (waypoints.length <= i) {
                    clearInterval(drawInterval);
                    resolve(true);
                }
            }, this.lineTimeRatio);
        });
    }

    private getFirstPoint(): void {
        this.firstPoint = FigureHelper.getFirstPoint(this.canvasDimensions)
    }
}