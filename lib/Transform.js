"use strict";
const Transformer_1 = require('./Transformer');
class Transform extends Transformer_1.default {
    constructor({ a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = {}) {
        super();
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }
    preDraw(context) {
        context.save();
        context.transform(this._a, this._b, this._c, this._d, this._e, this._f);
    }
    postDraw(context) {
        context.restore();
    }
    getBounds() {
        const bounds = super.getBounds();
        const { x: minX, y: minY } = this.transform({ x: bounds.minX, y: bounds.minY });
        const { x: maxX, y: maxY } = this.transform({ x: bounds.maxX, y: bounds.maxY });
        return { minX, minY, maxX, maxY };
    }
    intersection(point) {
        const untransformedPoint = this.untransform(point);
        return super.intersection(untransformedPoint);
    }
    transform(point) {
        return {
            x: point.x * this._a + point.y * this._c + this._e,
            y: point.x * this._b + point.y * this._d + this._f
        };
    }
    untransform(point) {
        const denominator = this._b * this._c - this._a * this._d;
        return {
            x: (this._c * (point.y - this._f) + this._d * (this._e - point.x)) / denominator,
            y: (this._a * (this._f - point.y) + this._b * (point.x - this._e)) / denominator
        };
    }
    clear() {
        this._a = 1;
        this._b = 0;
        this._c = 0;
        this._d = 1;
        this._e = 0;
        this._f = 0;
    }
    rotate(angle) {
        // Assume angle is in radians
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const { _a: a, _b: b, _c: c, _d: d, _e: e, _f: f } = this;
        this._a = a * cos - b * sin;
        this._b = a * sin + b * cos;
        this._c = c * cos - d * sin;
        this._d = c * sin + d * cos;
        this._e = e * cos - f * sin;
        this._f = e * sin + f * cos;
    }
    translate(x, y) {
        this._e += x;
        this._f += y;
    }
    scale(x, y) {
        this._a *= x;
        this._b *= y;
        this._c *= x;
        this._d *= y;
        this._e *= x;
        this._f *= y;
    }
    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }
    get b() {
        return this._b;
    }
    set b(value) {
        this._b = value;
    }
    get c() {
        return this._c;
    }
    set c(value) {
        this._c = value;
    }
    get d() {
        return this._d;
    }
    set d(value) {
        this._d = value;
    }
    get e() {
        return this._e;
    }
    set e(value) {
        this._e = value;
    }
    get f() {
        return this._f;
    }
    set f(value) {
        this._f = value;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Transform;
;
//# sourceMappingURL=Transform.js.map