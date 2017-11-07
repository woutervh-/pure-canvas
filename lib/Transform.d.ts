import Node, { Bounds, Point } from './Node';
import TransformerBase from './TransformerBase';
export default class Transform<T> extends TransformerBase<T> {
    private _a;
    private _b;
    private _c;
    private _d;
    private _e;
    private _f;
    constructor({a, b, c, d, e, f}?: {
        a?: number;
        b?: number;
        c?: number;
        d?: number;
        e?: number;
        f?: number;
    });
    preDraw(context: CanvasRenderingContext2D): void;
    postDraw(context: CanvasRenderingContext2D): void;
    getBounds(): Bounds;
    intersection(point: Point): Node<T> | undefined;
    transform(point: Point): Point;
    untransform(point: Point): Point;
    clear(): void;
    rotate(angle: number): void;
    translate(x: number, y: number): void;
    scale(x: number, y: number): void;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
