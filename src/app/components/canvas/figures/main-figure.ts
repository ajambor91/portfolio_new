import { Colors } from "src/app/helpers/color.helpers";
import { FigureHelper } from "../helpers/figure.helper";
import { CanvasDimensions } from "../models/canvas-dimension.model";
import { PointCoords } from "../models/point-coords.model";

export abstract class MainFigure {
    protected canvasDimensions: CanvasDimensions;
    protected context: CanvasRenderingContext2D;
    protected firstPoint: PointCoords;

    private color: string;

    constructor(context: CanvasRenderingContext2D, canvasDimensions: CanvasDimensions) {
        this.context = context;
        this.canvasDimensions = canvasDimensions;
        this.getFirstPoint();
        this.color = Colors.returnRanomdColor();
  
    }
    
    private getFirstPoint(): void {
        this.firstPoint = FigureHelper.getFirstPoint(this.canvasDimensions)
    }

    protected drawLine(startPoint: PointCoords, targetPoint: PointCoords): Promise<boolean> {
        // this.context.beginPath();
        // this.context.moveTo(startPoint.x, startPoint.y);
        const distanceX = startPoint.x < targetPoint.x ? targetPoint.x - startPoint.x : startPoint.x - targetPoint.x;
        const distanceY = startPoint.y < targetPoint.y ? targetPoint.y - startPoint.y : startPoint.y - targetPoint.y;
        var hlen = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        return new Promise(resolve => {
            // const drawInterval = setInterval(() => {
            // let point = startPoint;
            // this.context.lineTo(point.x, point.y);
            // this.context.lineWidth = 10;
            // var smallerLen = 1;

            // var ratio = smallerLen / hlen;
            // var smallerYLen = distanceY * ratio;

            // smallerLen++;
            // // set line color
            // this.context.strokeStyle = '#ff0000';
            // this.context.stroke();
            // if (startPoint.x < targetPoint.x && point.x < targetPoint.x) {
            //   point.x++;
            // } else if (startPoint.x > targetPoint.x && point.x > targetPoint.x) {
            //   point.x--;
            // }
            // if (startPoint.y < targetPoint.y && point.y < targetPoint.y) {
            //   point.y ++;
            // } else if (startPoint.y > targetPoint.y && point.y > targetPoint.y) {
            //   point.y --;
            // }
            // if (point.x === targetPoint.x && point.y >= targetPoint.y) {
            //   clearInterval(drawInterval);
            //   console.log('fdsfdf')
            //   resolve(true);
            // }
            // }, 5);
            this.context.beginPath();
            this.context.moveTo(startPoint.x, startPoint.y);
            this.context.lineWidth = 3;
            this.context.lineTo(targetPoint.x, targetPoint.y);
            this.context.strokeStyle = this.color;
            this.context.stroke();
            resolve(true)
        });
    }
}