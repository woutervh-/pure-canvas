"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var LayerCached = (function (_super) {
    __extends(LayerCached, _super);
    function LayerCached(_a) {
        var clipRegion = (_a === void 0 ? {} : _a).clipRegion;
        _super.call(this);
        this.caching = false;
        this.clipRegion = clipRegion;
    }
    LayerCached.prototype.getBounds = function () {
        if (this.clipRegion) {
            return this.clipRegion;
        }
        else {
            return _super.prototype.getBounds.call(this);
        }
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
    LayerCached.prototype.drawDeferred = function (context, stepAccumulator, commitAccumulator) {
        var _this = this;
        var _a = this.getBounds(), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        if (!this.cache) {
            this.cache = document.createElement('canvas');
            this.cache.width = maxX - minX;
            this.cache.height = maxY - minY;
            var cacheContext_1 = this.cache.getContext('2d');
            var cacheStepAccumulator = [];
            var cacheCommitAccumulator = [];
            _super.prototype.drawDeferred.call(this, cacheContext_1, cacheStepAccumulator, cacheCommitAccumulator);
            stepAccumulator.push(function () { return cacheContext_1.translate(-minX, -minY); });
            for (var _i = 0, cacheStepAccumulator_1 = cacheStepAccumulator; _i < cacheStepAccumulator_1.length; _i++) {
                var cacheStep = cacheStepAccumulator_1[_i];
                stepAccumulator.push(cacheStep);
            }
            for (var _b = 0, cacheCommitAccumulator_1 = cacheCommitAccumulator; _b < cacheCommitAccumulator_1.length; _b++) {
                var cacheCommit = cacheCommitAccumulator_1[_b];
                stepAccumulator.push(cacheCommit);
            }
            stepAccumulator.push(function () { return cacheContext_1.translate(minX, minY); });
        }
        commitAccumulator.push(function () {
            context.drawImage(_this.cache, minX, minY, maxX - minX, maxY - minY);
        });
    };
    return LayerCached;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerCached;
;
//# sourceMappingURL=LayerCached.js.map