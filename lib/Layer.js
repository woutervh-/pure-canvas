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
        this.hitEnabled = true;
        this.children = [];
    }
    Layer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.draw(context);
        }
    };
    Layer.prototype.drawDeferred = function (context, stepAccumulator, commitAccumulator) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.drawDeferred(context, stepAccumulator, commitAccumulator);
        }
    };
    Layer.prototype.getBounds = function () {
        var minX = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var _b = child.getBounds(), childMinX = _b.minX, childMinY = _b.minY, childMaxX = _b.maxX, childMaxY = _b.maxY;
            minX = Math.min(minX, childMinX);
            minY = Math.min(minY, childMinY);
            maxX = Math.max(maxX, childMaxX);
            maxY = Math.max(maxY, childMaxY);
        }
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
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
    Layer.prototype.index = function (action, zIndex) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.isHitEnabled()) {
                child.index(action, zIndex++);
            }
        }
    };
    Layer.prototype.isHitEnabled = function () {
        return this.hitEnabled;
    };
    Layer.prototype.setHitEnabled = function (value) {
        this.hitEnabled = value;
    };
    return Layer;
}(NodeBasic_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layer;
//# sourceMappingURL=Layer.js.map