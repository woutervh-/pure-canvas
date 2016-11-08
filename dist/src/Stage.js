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
        var point = this.eventToElementCoordinate(event);
        var results = this.tree
            .search({ minX: point.x, minY: point.y, maxX: point.x, maxY: point.y })
            .sort(function (a, b) { return a.zIndex - b.zIndex; })
            .map(function (indexedNode) {
            var _a = indexedNode.origin, x = _a.x, y = _a.y;
            var transformedPoint = { x: point.x - x, y: point.y - y };
            return indexedNode.node.intersection(transformedPoint);
        })
            .filter(Boolean);
        this.emit(name, results[0], event);
    };
    Stage.prototype.render = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.internalLayer.draw(this.context);
        this.tree.clear();
        this.internalLayer.index(function (node, origin, zIndex, _a) {
            var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            _this.tree.insert({ minX: x, minY: y, maxX: x + width, maxY: y + height, origin: origin, node: node, zIndex: zIndex });
        }, { x: 0, y: 0 }, 0);
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