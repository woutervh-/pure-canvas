"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventemitter3_1 = require('eventemitter3');
var Layer_1 = require('./Layer');
var rbush = require('rbush');
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(canvas) {
        var _this = this;
        _super.call(this);
        this.internalLayer = new Layer_1.default();
        this.tree = rbush();
        this.handleMouseDown = function (event) {
            _this.emitHitEvent('mousedown', event);
        };
        this.handleMouseMove = function (event) {
            _this.emitHitEvent('mousemove', event);
        };
        this.handleMouseUp = function (event) {
            _this.emitHitEvent('mouseup', event);
        };
        this.handleClick = function (event) {
            _this.emitHitEvent('click', event);
        };
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleClick);
    }
    Stage.prototype.destroy = function () {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('click', this.handleClick);
    };
    Stage.prototype.eventToElementCoordinate = function (_a, element) {
        var clientX = _a.clientX, clientY = _a.clientY;
        if (element === void 0) { element = this.canvas; }
        var _b = element.getBoundingClientRect(), left = _b.left, top = _b.top;
        return {
            x: Math.round(clientX - left),
            y: Math.round(clientY - top)
        };
    };
    Stage.prototype.emitHitEvent = function (name, event) {
        var _this = this;
        var didSearch = false;
        var result = undefined;
        this.emit(name, function () {
            if (!didSearch) {
                var point_1 = _this.eventToElementCoordinate(event);
                var results = _this.tree
                    .search({ minX: point_1.x, minY: point_1.y, maxX: point_1.x, maxY: point_1.y })
                    .sort(function (a, b) { return b.zIndex - a.zIndex; })
                    .map(function (indexedNode) {
                    var untransformedPoint = indexedNode.transformers.reduceRight(function (point, transformer) { return transformer.untransform(point); }, point_1);
                    return indexedNode.node.intersection(untransformedPoint);
                })
                    .filter(Boolean);
                result = results[0];
                didSearch = true;
            }
            return result;
        }, event);
    };
    Stage.prototype.render = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.internalLayer.draw(this.context);
        this.index();
    };
    Stage.prototype.index = function () {
        var _this = this;
        this.tree.clear();
        this.internalLayer.index(function (node, zIndex, transformers) {
            var bounds = node.getBounds();
            var _a = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.minX, y: bounds.minY }), x1 = _a.x, y1 = _a.y;
            var _b = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.maxX, y: bounds.maxY }), x2 = _b.x, y2 = _b.y;
            var _c = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.minX, y: bounds.maxY }), x3 = _c.x, y3 = _c.y;
            var _d = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.maxX, y: bounds.minY }), x4 = _d.x, y4 = _d.y;
            var minX = Math.min(x1, x2, x3, x4);
            var minY = Math.min(y1, y2, y3, y4);
            var maxX = Math.max(x1, x2, x3, x4);
            var maxY = Math.max(y1, y2, y3, y4);
            _this.tree.insert({
                minX: minX, minY: minY, maxX: maxX, maxY: maxY,
                transformers: transformers, node: node, zIndex: zIndex
            });
        }, 0);
    };
    Stage.prototype.add = function (node) {
        return this.internalLayer.add(node);
    };
    Stage.prototype.remove = function (a) {
        this.internalLayer.remove(a);
    };
    Stage.prototype.removeAll = function () {
        this.internalLayer.removeAll();
    };
    Stage.prototype.count = function () {
        return this.internalLayer.count();
    };
    return Stage;
}(eventemitter3_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stage;
;
//# sourceMappingURL=Stage.js.map