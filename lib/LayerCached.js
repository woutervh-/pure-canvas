"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var LayerCached = (function (_super) {
    __extends(LayerCached, _super);
    function LayerCached() {
        _super.apply(this, arguments);
        this.caching = false;
    }
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
    return LayerCached;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerCached;
;
//# sourceMappingURL=LayerCached.js.map