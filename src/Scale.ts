import Layer from './Layer';
import Node, {Bounds, Point} from './Node';
import Transformer from './Transformer';

export default class Scale extends Layer implements Transformer {
    private _x: number;

    private _y: number;

    constructor({x = 0, y = 0} = {}) {
        super();
        this._x = x;
        this._y = y;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.scale(this._x, this._y);
        super.draw(context);
        context.scale(1 / this._x, 1 / this._y);
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
        return {x: point.x * this._x, y: point.y * this._y};
    }

    untransform(point: Point): Point {
        return {x: point.x / this._x, y: point.y / this._y};
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        super.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
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
