"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventemitter3_1 = require('eventemitter3');
var Layer_1 = require('./Layer');
var TreeManager_1 = require('./TreeManager');
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(canvas) {
        var _this = this;
        _super.call(this);
        this.internalLayer = new Layer_1.default();
        this.treeManager = new TreeManager_1.default(this.internalLayer);
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
                var point = _this.eventToElementCoordinate(event);
                result = _this.treeManager.intersection(point);
                didSearch = true;
            }
            return result;
        }, event);
    };
    Stage.prototype.render = function (index) {
        if (index === void 0) { index = true; }
        var _a = this.renderDeferred(), steps = _a.steps, commit = _a.commit;
        for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
            var step = steps_1[_i];
            step();
        }
        commit(index);
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.internalLayer.draw(this.context);
        // this.index();
    };
    Stage.prototype.renderAsynchronous = function (index, maxBatchTime) {
        var _this = this;
        if (index === void 0) { index = true; }
        if (maxBatchTime === void 0) { maxBatchTime = 10; }
        var _a = this.renderDeferred(), steps = _a.steps, commit = _a.commit;
        if (this.nonBlockingTimeoutId) {
            window.clearTimeout(this.nonBlockingTimeoutId);
        }
        var i = 0;
        var repeat = function () {
            _this.nonBlockingTimeoutId = window.setTimeout(batch, 0);
        };
        var batch = function () {
            var deadline = Date.now() + maxBatchTime;
            while (i < steps.length && Date.now() < deadline) {
                steps[i++]();
            }
            commit(false);
            if (i < steps.length) {
                repeat();
            }
            else {
                commit(index);
            }
        };
        repeat();
    };
    Stage.prototype.renderDeferred = function () {
        var _this = this;
        var stepAccumulator = [];
        var commitAccumulator = [];
        this.internalLayer.drawDeferred(stepAccumulator, commitAccumulator);
        var commit = function (index) {
            if (index === void 0) { index = false; }
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            for (var _i = 0, commitAccumulator_1 = commitAccumulator; _i < commitAccumulator_1.length; _i++) {
                var commit_1 = commitAccumulator_1[_i];
                commit_1(_this.context);
            }
            if (index) {
                _this.index();
            }
        };
        return { steps: stepAccumulator, commit: commit };
    };
    Stage.prototype.index = function () {
        this.treeManager.reindex();
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