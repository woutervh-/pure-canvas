import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface PolygonParameters {
    points: Array<Array<Point>>;
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}
declare class Polygon extends NodeFixedBounds {
    private points;
    private strokeStyle;
    private lineWidth;
    private fillStyle;
    constructor({points, strokeStyle, lineWidth, fillStyle}: PolygonParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default Polygon;