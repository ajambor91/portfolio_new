import { Condition } from "../classes/condition";
import { ColorHelper } from "../helpers/color.helpers";
import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { PointCoords } from "../models/point-coords.model";

export abstract class MainFigure {

    f

    protected canvasDimensions: CanvasDimensions;
    protected context: CanvasRenderingContext2D;
    protected firstPoint: PointCoords;

    private color: string;

    constructor(context: CanvasRenderingContext2D, canvasDimensions: CanvasDimensions) {
        this.context = context;
        this.canvasDimensions = canvasDimensions;
        this.getFirstPoint();
        this.color = ColorHelper.returnRanomdColor();

    }

    protected drawRectangle(startPoint: PointCoords, secondPoint: PointCoords, thirdPoint: PointCoords, fourthPoint: PointCoords): void {
        this.drawLine(startPoint, secondPoint).then(res => {
            this.drawLine(secondPoint, thirdPoint).then(res => {
                this.drawLine(thirdPoint, fourthPoint).then(res => {
                    this.drawLine(fourthPoint, startPoint);
                });
            });
        });
    }

    protected drawTriangle(startPoint: PointCoords, secondPoint: PointCoords, thirdPoint: PointCoords): void {
        this.drawLine(startPoint, secondPoint).then(res => {
            this.drawLine(secondPoint, thirdPoint).then(res => {
                this.drawLine(thirdPoint, startPoint);
            });
        });
    }

    protected drawLine(startPoint: PointCoords, targetPoint: PointCoords): Promise<boolean> {
        const condition = new Condition();
        this.context.beginPath();

        // startPoint.x = 500;
        // startPoint.y = 500;
        // targetPoint.x = 50;
        // targetPoint.y = 200;
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
        let point = startPoint;
        var xlen = targetPoint.x - startPoint.x;
        var ylen = targetPoint.y - startPoint.y;
        var hlen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2));
        console.log(startPoint, targetPoint)
        const waypoints = this.calcWayPoints(startPoint, targetPoint);
        console.log(waypoints)
        let i = 0;
        return new Promise(resolve => {
            const drawInterval = setInterval(() => {
                this.context.lineTo(waypoints[i].x, waypoints[i].y);
                this.context.lineCap = 'round';
                this.context.strokeStyle = this.color;
                this.context.lineWidth = 3;
                this.context.stroke();

                console.log(waypoints[i])

                i++
                if (waypoints.length <= i) {
                    //@ts-ignore
                    window.requestAnimationFrame(resolve);
                    clearInterval(drawInterval);
                    console.log('fdsfdf')

                    resolve(true);
                }
            }, 5);
            // this.context.beginPath();
            // this.context.moveTo(startPoint.x, startPoint.y);
            // this.context.lineWidth = 3;
            // this.context.lineTo(targetPoint.x, targetPoint.y);
            // this.context.strokeStyle = this.color;
            // this.context.stroke();
            // resolve(true)
        });
    }

    private getFirstPoint(): void {
        this.firstPoint = FigureHelper.getFirstPoint(this.canvasDimensions)
    }

    private compare(post, operator, value) {
        switch (operator) {
            case '>': return post > value;
            case '<': return post < value;
            case '>=': return post >= value;
            case '<=': return post <= value;
            case '==': return post == value;
            case '!=': return post != value;
            case '===': return post === value;
            case '!==': return post !== value;
        }
    }

    calcWayPoints(startPoint: PointCoords, endPoint: PointCoords): PointCoords[] {
        var waypoints: PointCoords[] = [];

        var pt0 = startPoint;
        var pt1 = endPoint;
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x: +x.toFixed(0),
                y: +y.toFixed(0)
            });
        }
        return waypoints;
    }
}