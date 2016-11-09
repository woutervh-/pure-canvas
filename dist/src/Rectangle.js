"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(_a) {
        var x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, _b = _a.strokeStyle, strokeStyle = _b === void 0 ? 'rgba(0, 0, 0, 1)' : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = _a.fillStyle, fillStyle = _d === void 0 ? 'rgba(255, 255, 255, 1)' : _d;
        var minX = Math.min(x1, x2) - lineWidth / 2;
        var maxX = Math.max(x1, x2) + lineWidth / 2;
        var minY = Math.min(y1, y2) - lineWidth / 2;
        var maxY = Math.max(y1, y2) + lineWidth / 2;
        var bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        _super.call(this, bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
    }
    Rectangle.prototype.draw = function (context) {
        var _a = this, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, fillStyle = _a.fillStyle;
        var oldStrokeStyle = context.strokeStyle;
        var oldFillStyle = context.fillStyle;
        var oldLineWidth = context.lineWidth;
        context.beginPath();
        context.rect(x1, y1, x2 - x1, y2 - y1);
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
    Rectangle.prototype.intersection = function (_a) {
        var px = _a.x, py = _a.y;
        var _b = this.getBounds(), minX = _b.minX, minY = _b.minY, maxX = _b.maxX, maxY = _b.maxY;
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    };
    return Rectangle;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map