import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface LineStringParameters {
    points: Array<Point>;
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
}
declare class LineString extends NodeFixedBounds {
    private points;
    private strokeStyle;
    private lineWidth;
    private lineCap;
    constructor({points, strokeStyle, lineWidth, lineCap}: LineStringParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default LineString;
