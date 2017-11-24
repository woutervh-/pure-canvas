"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformerBase_1 = require("./TransformerBase");
class Translate extends TransformerBase_1.default {
    constructor(options = { x: 0, y: 0 }) {
        super();
        this._x = options.x;
        this._y = options.y;
    }
    preDraw(context) {
        context.translate(this._x, this._y);
    }
    postDraw(context) {
        context.translate(-this._x, -this._y);
    }
    getBounds() {
        const { minX, minY, maxX, maxY } = super.getBounds();
        return {
            minX: minX + this._x,
            minY: minY + this._y,
            maxX: maxX + this._x,
            maxY: maxY + this._y
        };
    }
    intersection(point) {
        const translatedPoint = { x: point.x - this._x, y: point.y - this._y };
        return super.intersection(translatedPoint);
    }
    transform(point) {
        return { x: point.x + this._x, y: point.y + this._y };
    }
    untransform(point) {
        return { x: point.x - this._x, y: point.y - this._y };
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
exports.default = Translate;
;
//# sourceMappingURL=Translate.js.map