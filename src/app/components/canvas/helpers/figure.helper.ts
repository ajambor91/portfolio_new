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
        //double tan = xdiff / ydiff;
        const atan = Math.atan2(ydiff, xdiff);
        return atan;
    }

    static getSecondRectanglePoint(startPoint: PointCoords, targetPoint: PointCoords): PointCoords {
        // const a  = (targetPoint.y - startPoint.y) / (targetPoint.y - startPoint.y);
        // const b = -1 *a;
        // const y = b*100 + startPoint.y
        // var nx = targetPoint.x - startPoint.x;  // as vector
        // var ny = targetPoint.y - startPoint.y;
        // const len = Math.sqrt(nx * nx + ny * ny);  // length of line
        // nx /= len;  // make one unit long
        // ny /= len;  // which we call normalising a vector
        // // return [-ny, nx]; // return the normal  rotated 90 deg
        // const angle = this.getPerpendicularAngle(startPoint, targetPoint);

        // var slope = (targetPoint.y - startPoint.y) / (targetPoint.x - startPoint.x);
        // const x = targetPoint.x - slope * 10;
        // const y = targetPoint.y + slope * 10;

        // R = Raphael('raphaelPanel', 500, 500);

        // Start and end points
        // var startX = startPoint.x > startPoint.x ? startPoint.x : targetPoint.x,
        //     startY = startPoint.y > startPoint.y ? startPoint.y : targetPoint.y,
        //     endX = startPoint.x < startPoint.x ? startPoint.x : targetPoint.x,
        //     endY = startPoint.y < startPoint.y ? startPoint.y : targetPoint.y,
        //     centrePointX = Math.sqrt((startX * startX) + (endX * endX)),
        //     centrePointY = (Math.sqrt((startY * startY) + (endY * endY))),
        //     angle = Math.atan2(endY - startY, endX - startX),
        //     dist = 10;


        // Draw a line between the two original points
        // R.path('M '+startX+' '+startY+', L '+endX+' '+endY);
        // // Draw a normal to the line above
        // R.path('M '+ (Math.sin(angle) * dist + centrePointX) + ' ' + (-Math.cos(angle) * dist + centrePointY) + ', L ' + (-Math.sin(angle) * dist + centrePointX) + ' ' + (Math.cos(angle) * dist + centrePointY))
        const x = startPoint.x;
        
        // return { x: (Math.sin(angle) * dist + centrePointX), y:  (-Math.cos(angle) * dist + centrePointY) };

        return { x: 100, y: 200 };
    }

    static getDistance(startPoint: PointCoords, targetPoint: PointCoords): number {
        return Math.sqrt(Math.pow(startPoint.x - targetPoint.x, 2) + Math.pow(startPoint.y - targetPoint.y, 2));
    }

    static calcParralelLine(firstPoint: PointCoords, secondPoint: PointCoords): PointCoords[] {
        const dx = secondPoint.x - firstPoint.x ;
        const dy =  secondPoint.y - firstPoint.y ;
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
            { x: sx, y: sy },
            { x: nx, y: ny }
        ];
    }
    private static checkPointCoord(calcedPoint: PointCoords, canvasDimensions: CanvasDimensions): PointCoords {
        if (calcedPoint.x < 50) calcedPoint.x = 50;
        else if (calcedPoint.x > canvasDimensions.width - 50) calcedPoint.x = canvasDimensions.width - 50;

        if (calcedPoint.y < 50) calcedPoint.y = 50;
        else if (calcedPoint.y > canvasDimensions.height - 50) calcedPoint.y = canvasDimensions.height - 50;
        return calcedPoint;
    }


}
// const a = a = (targetPoint.y - startPoint.y) / (targetPoint.y - startPoint.y);
// const b =
// return { x: x, y: y };
//funkcja liniowa