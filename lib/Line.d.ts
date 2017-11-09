import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface LineStyle {
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
}
export interface LineParameters extends LineStyle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
declare class Line<T> extends NodeFixedBounds<T> {
    private x1;
    private y1;
    private x2;
    private y2;
    private strokeStyle;
    private lineWidth;
    private lineCap;
    constructor({x1, y1, x2, y2, strokeStyle, lineWidth, lineCap}: LineParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Line<T> | undefined;
}
export default Line;
