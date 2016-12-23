"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, radius = _a.radius, _d = _a.lineWidth, lineWidth = _d === void 0 ? 1 : _d, _e = _a.strokeStyle, strokeStyle = _e === void 0 ? 'rgba(0, 0, 0, 1)' : _e, _f = _a.fillStyle, fillStyle = _f === void 0 ? 'rgba(255, 255, 255, 1)' : _f;
        var minX = x - radius - lineWidth / 2;
        var minY = y - radius - lineWidth / 2;
        var maxX = x + radius + lineWidth / 2;
        var maxY = y + radius + lineWidth / 2;
        var bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        _super.call(this, bounds);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    Circle.prototype.draw = function (context) {
        var _a = this, x = _a.x, y = _a.y, radius = _a.radius, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, fillStyle = _a.fillStyle;
        var oldStrokeStyle = context.strokeStyle;
        var oldFillStyle = context.fillStyle;
        var oldLineWidth = context.lineWidth;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.strokeStyle = strokeStyle;
        context.fillStyle = fillStyle;
        context.lineWidth = lineWidth;
        context.fill();
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.fillStyle = oldFillStyle;
        context.lineWidth = oldLineWidth;
    };
    Circle.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, ox = _b.x, oy = _b.y, radius = _b.radius, lineWidth = _b.lineWidth;
        if (Math.pow((x - ox), 2) + Math.pow((y - oy), 2) <= Math.pow((radius + lineWidth / 2), 2)) {
            return this;
        }
    };
    return Circle;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Circle;
//# sourceMappingURL=Circle.js.map