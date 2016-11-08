"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeBasic_1 = require('./NodeBasic');
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        _super.apply(this, arguments);
        this.children = [];
    }
    Layer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.draw(context);
        }
    };
    Layer.prototype.getBounds = function () {
        var minX = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var _b = child.getBounds(), x = _b.x, y = _b.y, width = _b.width, height = _b.height;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x + width);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y + height);
        }
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    };
    Layer.prototype.add = function (node) {
        this.children.push(node);
        return this.children.length - 1;
    };
    Layer.prototype.remove = function (a) {
        if (typeof a === 'number') {
            this.children.splice(a, 1);
        }
        else {
            this.remove(this.children.indexOf(a));
        }
    };
    Layer.prototype.removeAll = function () {
        this.children = [];
    };
    Layer.prototype.count = function () {
        return this.children.length;
    };
    Layer.prototype.intersection = function (point) {
        // Visit children in reverse order: the ones drawn last must be checked first
        for (var _i = 0, _a = this.children.slice().reverse(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.isHitEnabled()) {
                var intersection = child.intersection(point);
                if (!!intersection) {
                    return intersection;
                }
            }
        }
    };
    Layer.prototype.index = function (action, origin, zIndex) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.isHitEnabled()) {
                child.index(action, origin, zIndex++);
            }
        }
    };
    return Layer;
}(NodeBasic_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layer;
//# sourceMappingURL=Layer.js.map