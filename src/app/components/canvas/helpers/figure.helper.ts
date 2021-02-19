import { CanvasDimensions } from "../models/canvas-dimension.model";
import { PointCoords } from "../models/point-coords.model";

export class FigureHelper {

    static getFirstPoint(canvasDimensions: CanvasDimensions): PointCoords {
        const point: PointCoords = {
            x: Math.floor(Math.random() * (canvasDimensions.width)) + 1,
            y: Math.floor(Math.random() * (canvasDimensions.height)) + 1
        };
        return this.checkPointCoord(point, canvasDimensions);
    }

    static getMinAndMax(point: PointCoords, canvasDimension: CanvasDimensions): PointCoords {
        const direction = (Math.floor(Math.random() * 4)) + 1;
        if (direction === 1) {
            var calcedPoint: PointCoords = {
                x: Math.floor(Math.random() * 150) + point.x,
                y: Math.floor(Math.random() * 150) + point.y
            }

        } else if (direction === 2) {
            var calcedPoint: PointCoords = {
                x: point.x - Math.floor(Math.random() * 150),
                y: point.y - Math.floor(Math.random() * 150)
            }

        } else if (direction === 3) {
            var calcedPoint: PointCoords = {
                x: Math.floor(Math.random() * 150) + point.x,
                y: point.y - Math.floor(Math.random() * 150)
            }

        } else if (direction === 4) {
            var calcedPoint: PointCoords = {
                x: point.x - Math.floor(Math.random() * 150),
                y: Math.floor(Math.random() * 150) + point.y
            }
        }
        return this.checkPointCoord(calcedPoint, canvasDimension);

    }

    private static checkPointCoord(calcedPoint: PointCoords, canvasDimensions: CanvasDimensions): PointCoords {
        if (calcedPoint.x < 50) calcedPoint.x = 50;
        else if (calcedPoint.x > canvasDimensions.width -50) calcedPoint.x = canvasDimensions.width - 50;
    
        if (calcedPoint.y < 50) calcedPoint.y = 50;
        else if (calcedPoint.y > canvasDimensions.height - 50) calcedPoint.y = canvasDimensions.height - 50;
        return calcedPoint;
      }
}