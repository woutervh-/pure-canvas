"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var TreeManager_1 = require('./TreeManager');
var emptyTransformers = [];
var LayerCached = (function (_super) {
    __extends(LayerCached, _super);
    function LayerCached(_a) {
        var clipRegion = (_a === void 0 ? {} : _a).clipRegion;
        _super.call(this);
        this.caching = false;
        this.indexing = false;
        this.clipRegion = clipRegion;
    }
    LayerCached.prototype.invalidateAll = function () {
        this.invalidateBuffer();
        this.invalidateIndex();
        this.invalidateBounds();
    };
    LayerCached.prototype.invalidateBuffer = function () {
        this.cache = undefined;
    };
    LayerCached.prototype.invalidateIndex = function () {
        this.treeManager = undefined;
    };
    LayerCached.prototype.invalidateBounds = function () {
        this.cachedBounds = undefined;
    };
    LayerCached.prototype.getBounds = function () {
        if (!this.cachedBounds) {
            if (this.clipRegion) {
                var _a = this.clipRegion, clipMinX = _a.minX, clipMinY = _a.minY, clipMaxX = _a.maxX, clipMaxY = _a.maxY;
                var _b = _super.prototype.getBounds.call(this), minX = _b.minX, minY = _b.minY, maxX = _b.maxX, maxY = _b.maxY;
                this.cachedBounds = {
                    minX: Math.max(minX, clipMinX),
                    minY: Math.max(minY, clipMinY),
                    maxX: Math.min(maxX, clipMaxX),
                    maxY: Math.min(maxY, clipMaxY)
                };
            }
            else {
                this.cachedBounds = _super.prototype.getBounds.call(this);
            }
        }
        return this.cachedBounds;
    };
    LayerCached.prototype.draw = function (context) {
        if (this.caching) {
            _super.prototype.draw.call(this, context);
        }
        else {
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage();
                this.caching = false;
            }
            var _a = this.getBounds(), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
            context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
        }
    };
    LayerCached.prototype.drawDeferred = function (stepAccumulator, commitAccumulator) {
        var _this = this;
        var _a = this.getBounds(), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        var width = maxX - minX;
        var height = maxY - minY;
        if (width > 0 && height > 0) {
            if (!this.cache) {
                this.cache = document.createElement('canvas');
                this.cache.width = width;
                this.cache.height = height;
                var cacheContext_1 = this.cache.getContext('2d');
                var cacheStepAccumulator = [];
                var cacheCommitAccumulator = [];
                _super.prototype.drawDeferred.call(this, cacheStepAccumulator, cacheCommitAccumulator);
                stepAccumulator.push(function () { return cacheContext_1.translate(-minX, -minY); });
                for (var _i = 0, cacheStepAccumulator_1 = cacheStepAccumulator; _i < cacheStepAccumulator_1.length; _i++) {
                    var cacheStep = cacheStepAccumulator_1[_i];
                    stepAccumulator.push(cacheStep);
                }
                var _loop_1 = function(cacheCommit) {
                    stepAccumulator.push(function () { return cacheCommit(cacheContext_1); });
                };
                for (var _b = 0, cacheCommitAccumulator_1 = cacheCommitAccumulator; _b < cacheCommitAccumulator_1.length; _b++) {
                    var cacheCommit = cacheCommitAccumulator_1[_b];
                    _loop_1(cacheCommit);
                }
                stepAccumulator.push(function () { return cacheContext_1.translate(minX, minY); });
            }
            commitAccumulator.push(function (context) {
                context.drawImage(_this.cache, minX, minY, width, height);
            });
        }
    };
    LayerCached.prototype.index = function (action, zIndex) {
        if (this.indexing) {
            return _super.prototype.index.call(this, action, zIndex);
        }
        else {
            action(this, zIndex, emptyTransformers);
            return zIndex;
        }
    };
    LayerCached.prototype.intersection = function (point) {
        if (!this.treeManager) {
            this.indexing = true;
            this.treeManager = new TreeManager_1.default(this);
            this.treeManager.reindex();
            this.indexing = false;
        }
        return this.treeManager.intersection(point);
    };
    LayerCached.prototype.add = function (node) {
        this.invalidateAll();
        return _super.prototype.add.call(this, node);
    };
    LayerCached.prototype.remove = function (a) {
        this.invalidateAll();
        _super.prototype.remove.call(this, a);
    };
    LayerCached.prototype.removeAll = function () {
        this.invalidateAll();
        _super.prototype.removeAll.call(this);
    };
    LayerCached.prototype.setClipRegion = function (clipRegion) {
        this.invalidateBounds();
        this.invalidateBuffer();
        this.clipRegion = clipRegion;
    };
    return LayerCached;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerCached;
;
//# sourceMappingURL=LayerCached.js.map