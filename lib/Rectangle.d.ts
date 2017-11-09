import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface RectangleStyle {
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}
export interface RectangleParameters extends RectangleStyle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
declare class Rectangle<T> extends NodeFixedBounds<T> {
    private x1;
    private y1;
    private x2;
    private y2;
    private strokeStyle;
    private lineWidth;
    private fillStyle;
    constructor({x1, y1, x2, y2, strokeStyle, lineWidth, fillStyle}: RectangleParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x: px, y: py}: Point): Rectangle<T> | undefined;
}
export default Rectangle;
