"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var zeroPoint = { x: 0, y: 0 };
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(_a) {
        // TODO: lineWidth to increase bounds
        var points = _a.points, _b = _a.strokeStyle, strokeStyle = _b === void 0 ? 'rgba(0, 0, 0, 1)' : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = _a.fillStyle, fillStyle = _d === void 0 ? 'rgba(255, 255, 255, 1)' : _d;
        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        for (var i = 0; i < points.length; i++) {
            for (var j = 0; j < points[i].length; j++) {
                minX = Math.min(minX, points[i][j].x);
                minY = Math.min(minY, points[i][j].y);
                maxX = Math.max(maxX, points[i][j].x);
                maxY = Math.max(maxY, points[i][j].y);
            }
        }
        var bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        _super.call(this, bounds);
        this.points = points;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
    }
    Polygon.prototype.draw = function (context) {
        var _a = this, points = _a.points, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, fillStyle = _a.fillStyle;
        var oldStrokeStyle = context.strokeStyle;
        var oldLineWidth = context.lineWidth;
        var oldFillStyle = context.fillStyle;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.fillStyle = fillStyle;
        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            // TODO:
            // Given an option 'automaticCounterHoles' => automatically reverse the 2nd, 3rd, 4th, etc. polygons
            // For now just force API user to make sure holes are in counter-clockwise direction
            if (points[i].length >= 1) {
                var _b = points[i][0], x = _b.x, y = _b.y;
                context.moveTo(x, y);
            }
            for (var j = 1; j < points[i].length; j++) {
                var _c = points[i][j], x = _c.x, y = _c.y;
                context.lineTo(x, y);
            }
            context.closePath();
        }
        context.fill();
        if (lineWidth > 0) {
            context.stroke();
        }
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.fillStyle = oldFillStyle;
    };
    Polygon.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, points = _b.points, lineWidth = _b.lineWidth;
        var vertices = [];
        // TODO: algorithm should take lineWidth into account
        vertices.push(zeroPoint);
        for (var i = 0; i < points.length; i++) {
            for (var j = 0; j < points[i].length; j++) {
                vertices.push(points[i][j]);
            }
            if (points[i].length >= 1) {
                vertices.push(points[i][0]);
            }
            vertices.push(zeroPoint);
        }
        var inside = false;
        for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            if (((vertices[i].y > y) !== (vertices[j].y > y)) && (x < (vertices[j].x - vertices[i].x) * (y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
                inside = !inside;
            }
        }
        if (inside) {
            return this;
        }
    };
    return Polygon;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Polygon;
//# sourceMappingURL=Polygon.js.map