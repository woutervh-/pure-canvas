"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(_a) {
        var x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, _b = _a.strokeStyle, strokeStyle = _b === void 0 ? 'rgba(0, 0, 0, 1)' : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = _a.lineCap, lineCap = _d === void 0 ? 'butt' : _d;
        var minX = Math.min(x1, x2) - lineWidth / 2;
        var minY = Math.min(y1, y2) - lineWidth / 2;
        var maxX = Math.max(x1, x2) + lineWidth / 2;
        var maxY = Math.max(y1, y2) + lineWidth / 2;
        var bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        _super.call(this, bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
    }
    Line.prototype.draw = function (context) {
        var _a = this, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, lineCap = _a.lineCap;
        var oldStrokeStyle = context.strokeStyle;
        var oldLineWidth = context.lineWidth;
        var oldLineCap = context.lineCap;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.lineCap = oldLineCap;
    };
    Line.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, x1 = _b.x1, y1 = _b.y1, x2 = _b.x2, y2 = _b.y2, lineWidth = _b.lineWidth;
        var distance2 = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
        var t;
        if (distance2 === 0) {
            t = 0;
        }
        else {
            t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / distance2;
        }
        if (0 <= t && t <= 1) {
            var dx = x - (x1 + t * (x2 - x1));
            var dy = y - (y1 + t * (y2 - y1));
            if (Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow((lineWidth / 2), 2)) {
                return this;
            }
        }
    };
    return Line;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Line;
//# sourceMappingURL=Line.js.map