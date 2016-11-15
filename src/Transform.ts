import Node, {Bounds, Point} from './Node';
import Transformer from './Transformer';

export default class Transform extends Transformer {
    private _a: number;

    private _b: number;

    private _c: number;

    private _d: number;

    private _e: number;

    private _f: number;

    constructor({a = 1, b = 0, c = 0, d = 1, e = 0, f = 0} = {}) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.transform(this._a, this._b, this._c, this._d, this._e, this._f);
        super.draw(context);
        context.restore();
    }

    getBounds(): Bounds {
        const {minX, minY, maxX, maxY} = super.getBounds();
        return {
            minX: minX * this._x,
            minY: minY * this._y,
            maxX: maxX * this._x,
            maxY: maxY * this._y
        };
    }

    intersection(point: Point): Node {
        const scaledPoint = {x: point.x / this._x, y: point.y / this._y};
        return super.intersection(scaledPoint);
    }

    transform(point: Point): Point {
        return {
            x: point.x * this._a + point.y * this._c + this._e,
            y: point.x * this._b + point.y * this._d + this._f
        };
    }

    untransform(point: Point): Point {
        const denominator = this._b * this._c - this._a * this._d;
        return {
            x: (this._c * (point.y - this._f) + this._d * (this._e - point.x)) / denominator,
            y: (this._a * (this._f - point.y) + this._b * (point.x - this._e)) / denominator
        };
    }

    clear(): void {
        this._a = 1;
        this._b = 0;
        this._c = 0;
        this._d = 1;
        this._e = 0;
        this._f = 0;
    }

    rotate(angle): void {
        // Assume angle is in radians
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        // TODO
    }

    translate(x, y): void {
        // TODO
    }

    scale(x, y): void {
        // TODO
    }

    get a(): number {
        return this._a;
    }

    set a(value: number) {
        this._a = value;
    }

    get b(): number {
        return this._b;
    }

    set b(value: number) {
        this._b = value;
    }

    get c(): number {
        return this._c;
    }

    set c(value: number) {
        this._c = value;
    }

    get d(): number {
        return this._d;
    }

    set d(value: number) {
        this._d = value;
    }

    get e(): number {
        return this._e;
    }

    set e(value: number) {
        this._e = value;
    }

    get f(): number {
        return this._f;
    }

    set f(value: number) {
        this._f = value;
    }
};
