import { PointCoords } from "./point-coords.model";


export interface TriangleCoordsModel{
    firstPoint: PointCoords;
    secondPoint: PointCoords;
    thirdPoint: PointCoords;
}

export interface RectangleCoordsModel extends TriangleCoordsModel{
    fourthPoint: PointCoords;
}