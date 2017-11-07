import Node, {Bounds, Point} from './Node';
import TransformerBase from './TransformerBase';

export default class Scale<T> extends TransformerBase<T> {
    private _x: number;

    private _y: number;

    constructor({x = 0, y = 0} = {}) {
        super();
        this._x = x;
        this._y = y;
    }

    preDraw(context: CanvasRenderingContext2D): void {
        context.scale(this._x, this._y);
    }

    postDraw(context: CanvasRenderingContext2D): void {
        context.scale(1 / this._x, 1 / this._y);
    }

    getBounds(): Bounds {
        const {minX, minY, maxX, maxY} = super.getBounds();
        return {
            minX: this._x >= 0 ? minX * this._x : maxX * this._x,
            minY: this._y >= 0 ? minY * this._y : maxY * this._y,
            maxX: this._x >= 0 ? maxX * this._x : minX * this._x,
            maxY: this._y >= 0 ? maxY * this._y : minY * this._y
        };
    }

    intersection(point: Point): Node<T> | undefined {
        const scaledPoint = {x: point.x / this._x, y: point.y / this._y};
        return super.intersection(scaledPoint);
    }

    transform(point: Point): Point {
        return {x: point.x * this._x, y: point.y * this._y};
    }

    untransform(point: Point): Point {
        return {x: point.x / this._x, y: point.y / this._y};
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
};
