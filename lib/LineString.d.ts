import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface LineStringStyle {
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
}
export interface LineStringParameters extends LineStringStyle {
    points: Array<Point>;
}
declare class LineString<T> extends NodeFixedBounds<T> {
    private points;
    private strokeStyle;
    private lineWidth;
    private lineCap;
    constructor({points, strokeStyle, lineWidth, lineCap}: LineStringParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node<T> | undefined;
}
export default LineString;
