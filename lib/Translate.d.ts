import Node, { Bounds, Point } from './Node';
import TransformerBase from './TransformerBase';
export default class Translate<T> extends TransformerBase<T> {
    private _x;
    private _y;
    constructor(options?: {
        x: number;
        y: number;
    });
    preDraw(context: CanvasRenderingContext2D): void;
    postDraw(context: CanvasRenderingContext2D): void;
    getBounds(): Bounds;
    intersection(point: Point): Node<T> | undefined;
    transform(point: Point): Point;
    untransform(point: Point): Point;
    x: number;
    y: number;
}
