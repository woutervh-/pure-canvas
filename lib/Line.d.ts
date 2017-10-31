import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface LineParameters {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
}
declare class Line extends NodeFixedBounds {
    private x1;
    private y1;
    private x2;
    private y2;
    private strokeStyle;
    private lineWidth;
    private lineCap;
    constructor({x1, y1, x2, y2, strokeStyle, lineWidth, lineCap}: LineParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default Line;
