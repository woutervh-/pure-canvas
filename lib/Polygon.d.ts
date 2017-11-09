import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface PolygonStyle {
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}
export interface PolygonParameters extends PolygonStyle {
    points: Array<Array<Point>>;
}
declare class Polygon<T> extends NodeFixedBounds<T> {
    private points;
    private strokeStyle;
    private lineWidth;
    private fillStyle;
    constructor({points, strokeStyle, lineWidth, fillStyle}: PolygonParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Polygon<T> | undefined;
}
export default Polygon;
