import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface CircleParameters {
    x?: number;
    y?: number;
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
}
declare class Circle extends NodeFixedBounds {
    private x;
    private y;
    private radius;
    private lineWidth;
    private strokeStyle;
    private fillStyle;
    constructor({x, y, radius, lineWidth, strokeStyle, fillStyle}: CircleParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default Circle;
