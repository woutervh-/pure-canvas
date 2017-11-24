"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformerBase_1 = require("./TransformerBase");
class Scale extends TransformerBase_1.default {
    constructor(options = { x: 0, y: 0 }) {
        super();
        this._x = options.x;
        this._y = options.y;
    }
    preDraw(context) {
        context.scale(this._x, this._y);
    }
    postDraw(context) {
        context.scale(1 / this._x, 1 / this._y);
    }
    getBounds() {
        const { minX, minY, maxX, maxY } = super.getBounds();
        return {
            minX: this._x >= 0 ? minX * this._x : maxX * this._x,
            minY: this._y >= 0 ? minY * this._y : maxY * this._y,
            maxX: this._x >= 0 ? maxX * this._x : minX * this._x,
            maxY: this._y >= 0 ? maxY * this._y : minY * this._y
        };
    }
    intersection(point) {
        const scaledPoint = { x: point.x / this._x, y: point.y / this._y };
        return super.intersection(scaledPoint);
    }
    transform(point) {
        return { x: point.x * this._x, y: point.y * this._y };
    }
    untransform(point) {
        return { x: point.x / this._x, y: point.y / this._y };
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
}
exports.default = Scale;
;
//# sourceMappingURL=Scale.js.map