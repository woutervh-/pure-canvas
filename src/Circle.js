"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BoundedNode_1 = require('./BoundedNode');
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var radius = _a.radius, _b = _a.lineWidth, lineWidth = _b === void 0 ? 1 : _b, _c = _a.strokeStyle, strokeStyle = _c === void 0 ? 'rgba(0, 0, 0, 1)' : _c, _d = _a.fillStyle, fillStyle = _d === void 0 ? 'rgba(255, 255, 255, 1)' : _d;
        var minX = Math.floor(-radius / 2 - lineWidth / 2);
        var maxX = Math.ceil(radius / 2 + lineWidth / 2);
        var minY = Math.floor(-radius / 2 - lineWidth / 2);
        var maxY = Math.ceil(radius / 2 + lineWidth / 2);
        var bounds = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
        _super.call(this, bounds);
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    Circle.prototype.draw = function (context) {
        var _a = this, radius = _a.radius, _b = _a.strokeStyle, strokeStyle = _b === void 0 ? 'rgba(0, 0, 0, 1)' : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = _a.fillStyle, fillStyle = _d === void 0 ? 'rgba(255, 255, 255, 1)' : _d;
        var oldStrokeStyle = context.strokeStyle;
        var oldFillStyle = context.fillStyle;
        var oldLineWidth = context.lineWidth;
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI, false);
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
    Circle.prototype.intersects = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, radius = _b.radius, _c = _b.lineWidth, lineWidth = _c === void 0 ? 1 : _c;
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow((radius + lineWidth), 2);
    };
    return Circle;
}(BoundedNode_1["default"]));
exports.__esModule = true;
exports["default"] = Circle;
//# sourceMappingURL=Circle.js.map