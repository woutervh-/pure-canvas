"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transformer_1 = require('./Transformer');
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform(_g) {
        var _h = _g === void 0 ? {} : _g, _j = _h.a, a = _j === void 0 ? 1 : _j, _k = _h.b, b = _k === void 0 ? 0 : _k, _l = _h.c, c = _l === void 0 ? 0 : _l, _m = _h.d, d = _m === void 0 ? 1 : _m, _o = _h.e, e = _o === void 0 ? 0 : _o, _p = _h.f, f = _p === void 0 ? 0 : _p;
        _super.call(this);
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
    }
    Transform.prototype.draw = function (context) {
        context.save();
        context.transform(this._a, this._b, this._c, this._d, this._e, this._f);
        _super.prototype.draw.call(this, context);
        context.restore();
    };
    Transform.prototype.getBounds = function () {
        var bounds = _super.prototype.getBounds.call(this);
        var _g = this.transform({ x: bounds.minX, y: bounds.minY }), minX = _g.x, minY = _g.y;
        var _h = this.transform({ x: bounds.maxX, y: bounds.maxY }), maxX = _h.x, maxY = _h.y;
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    };
    Transform.prototype.intersection = function (point) {
        var untransformedPoint = this.untransform(point);
        return _super.prototype.intersection.call(this, untransformedPoint);
    };
    Transform.prototype.transform = function (point) {
        return {
            x: point.x * this._a + point.y * this._c + this._e,
            y: point.x * this._b + point.y * this._d + this._f
        };
    };
    Transform.prototype.untransform = function (point) {
        var denominator = this._b * this._c - this._a * this._d;
        return {
            x: (this._c * (point.y - this._f) + this._d * (this._e - point.x)) / denominator,
            y: (this._a * (this._f - point.y) + this._b * (point.x - this._e)) / denominator
        };
    };
    Transform.prototype.clear = function () {
        this._a = 1;
        this._b = 0;
        this._c = 0;
        this._d = 1;
        this._e = 0;
        this._f = 0;
    };
    Transform.prototype.rotate = function (angle) {
        // Assume angle is in radians
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var _g = this, a = _g._a, b = _g._b, c = _g._c, d = _g._d, e = _g._e, f = _g._f;
        this._a = a * cos - b * sin;
        this._b = a * sin + b * cos;
        this._c = c * cos - d * sin;
        this._d = c * sin + d * cos;
        this._e = e * cos - f * sin;
        this._f = e * sin + f * cos;
    };
    Transform.prototype.translate = function (x, y) {
        this._e += x;
        this._f += y;
    };
    Transform.prototype.scale = function (x, y) {
        this._a *= x;
        this._b *= y;
        this._c *= x;
        this._d *= y;
        this._e *= x;
        this._f *= y;
    };
    Object.defineProperty(Transform.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (value) {
            this._a = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (value) {
            this._b = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "c", {
        get: function () {
            return this._c;
        },
        set: function (value) {
            this._c = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "d", {
        get: function () {
            return this._d;
        },
        set: function (value) {
            this._d = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "e", {
        get: function () {
            return this._e;
        },
        set: function (value) {
            this._e = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "f", {
        get: function () {
            return this._f;
        },
        set: function (value) {
            this._f = value;
        },
        enumerable: true,
        configurable: true
    });
    return Transform;
}(Transformer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Transform;
;
//# sourceMappingURL=Transform.js.map