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

    static getPerpendicularAngle(startPoint: PointCoords, targetPoint: PointCoords): number {
        const xdiff = Math.abs(startPoint.x - targetPoint.x);
        const ydiff = Math.abs(startPoint.y - targetPoint.y);
        return Math.atan2(ydiff, xdiff);
    }

    static calcParralelLine(firstPoint: PointCoords, secondPoint: PointCoords): PointCoords[] {
        const dx = secondPoint.x - firstPoint.x;
        const dy = secondPoint.y - firstPoint.y;
        const distance = this.calcCoordsDistance(firstPoint, secondPoint);
        const udx = dx / distance;
        const udy = dy / distance;
        const px = -udy;
        const py = udx
        const nx = firstPoint.x - udy * distance;
        const ny = firstPoint.y + udx * distance;
        const sx = nx + dx;
        const sy = ny + dy;
        return [
            { x: sx, y: sy },
            { x: nx, y: ny }
        ];
    }

    static calcWayPoints(startPoint: PointCoords, endPoint: PointCoords): PointCoords[] {
        const waypoints: PointCoords[] = [];
        const pt0 = startPoint;
        const pt1 = endPoint;
        const dx = pt1.x - pt0.x;
        const dy = pt1.y - pt0.y;
        let i = 0;
        const distance = +this.calcCoordsDistance(startPoint, endPoint).toFixed(0) * 2;
        for (i = 0; i < distance; i++) {
            const x = pt0.x + dx * i / distance;
            const y = pt0.y + dy * i / distance;
            waypoints.push({
                x: +x.toFixed(0),
                y: +y.toFixed(0)
            });
        }
        return waypoints;
    }

    private static calcCoordsDistance(firstPoint: PointCoords, secondPoint: PointCoords): number {
        return Math.sqrt(Math.pow(firstPoint.x - secondPoint.x, 2) + Math.pow(firstPoint.y - secondPoint.y, 2));
    }

    private static checkPointCoord(calcedPoint: PointCoords, canvasDimensions: CanvasDimensions): PointCoords {
        if (calcedPoint.x < 50) calcedPoint.x = 50;
        else if (calcedPoint.x > canvasDimensions.width - 50) calcedPoint.x = canvasDimensions.width - 50;

        if (calcedPoint.y < 50) calcedPoint.y = 50;
        else if (calcedPoint.y > canvasDimensions.height - 50) calcedPoint.y = canvasDimensions.height - 50;
        return calcedPoint;
    }

}
