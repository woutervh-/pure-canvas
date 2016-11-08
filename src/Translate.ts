import Layer from './Layer';
import Node, {Bounds, Point} from './Node';

export default class Translate extends Layer {
    private _x: number;

    private _y: number;

    constructor({x = 0, y = 0} = {}) {
        super();
        this._x = x;
        this._y = y;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this._x, this._y);
        super.draw(context);
        context.translate(-this._x, -this._y);
    }

    getBounds(): Bounds {
        const {x, y, width, height} = super.getBounds();
        return {x: x + this._x, y: y + this._y, width, height};
    }

    intersection(point: Point): Node {
        const translatedPoint = {x: point.x - this._x, y: point.y - this._y};
        return super.intersection(translatedPoint);
    }

    index(action: (node: Node, origin: Point, zIndex: number, bounds: Bounds) => void, origin: Point, zIndex: number): void {
        const shifted = {x: origin.x + this._x, y: origin.y + this._y};
        super.index((node: Node, origin: Point, zIndex: number, {x, y, width, height}: Bounds) => {
            action(node, origin, zIndex, {x: x + this._x, y: y + this._y, width, height});
        }, shifted, zIndex);
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
