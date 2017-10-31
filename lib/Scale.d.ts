import Node, { Bounds, Point } from './Node';
import TransformerBase from './TransformerBase';
export default class Scale extends TransformerBase {
    private _x;
    private _y;
    constructor({x, y}?: {
        x?: number;
        y?: number;
    });
    preDraw(context: CanvasRenderingContext2D): void;
    postDraw(context: CanvasRenderingContext2D): void;
    getBounds(): Bounds;
    intersection(point: Point): Node | undefined;
    transform(point: Point): Point;
    untransform(point: Point): Point;
    x: number;
    y: number;
}
