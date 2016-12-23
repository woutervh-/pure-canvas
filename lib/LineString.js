"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var LineString = (function (_super) {
    __extends(LineString, _super);
    function LineString(_a) {
        var points = _a.points, _b = _a.strokeStyle, strokeStyle = _b === void 0 ? 'rgba(0, 0, 0, 1)' : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = _a.lineCap, lineCap = _d === void 0 ? 'butt' : _d;
        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        for (var i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].x);
            minY = Math.min(minY, points[i].y);
            maxX = Math.max(maxX, points[i].x);
            maxY = Math.max(maxY, points[i].y);
        }
        var bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        _super.call(this, bounds);
        this.points = points;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
    }
    LineString.prototype.draw = function (context) {
        var _a = this, points = _a.points, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, lineCap = _a.lineCap;
        var oldStrokeStyle = context.strokeStyle;
        var oldLineWidth = context.lineWidth;
        var oldLineCap = context.lineCap;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.beginPath();
        if (points.length >= 1) {
            var _b = points[0], x = _b.x, y = _b.y;
            context.moveTo(x, y);
        }
        for (var i = 1; i < points.length; i++) {
            var _c = this.points[i], x = _c.x, y = _c.y;
            context.lineTo(x, y);
        }
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.lineCap = oldLineCap;
    };
    LineString.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, points = _b.points, lineWidth = _b.lineWidth;
        for (var i = 1; i < points.length; i++) {
            var _c = points[i - 1], x1 = _c.x, y1 = _c.y;
            var _d = points[i], x2 = _d.x, y2 = _d.y;
            var distance2 = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
            var t = void 0;
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
        }
    };
    return LineString;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LineString;
//# sourceMappingURL=LineString.js.map