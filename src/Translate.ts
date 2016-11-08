import Layer from './Layer';
import Node, {Bounds, Point} from './Node';
import * as rbush from 'rbush';

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

    index(action: (node: Node, origin: Point, bbox: rbush.BBox) => void): void {
        super.index((node: Node, {x, y}: Point, {minX, minY, maxX, maxY}: rbush.BBox) => {
            action(
                node,
                {
                    x: x + this._x, y: y + this._y
                }, {
                    minX: minX + this._x,
                    minY: minY + this._y,
                    maxX: maxX + this._x,
                    maxY: maxY + this._y
                }
            );
        });
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
