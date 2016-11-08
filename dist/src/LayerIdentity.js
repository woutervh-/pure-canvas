"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var LayerIdentity = (function (_super) {
    __extends(LayerIdentity, _super);
    function LayerIdentity() {
        _super.apply(this, arguments);
    }
    LayerIdentity.prototype.transform = function (point) {
        return point;
    };
    LayerIdentity.prototype.untransform = function (point) {
        return point;
    };
    LayerIdentity.prototype.transformBounds = function (bounds) {
        return bounds;
    };
    LayerIdentity.prototype.untransformBounds = function (bounds) {
        return bounds;
    };
    return LayerIdentity;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerIdentity;
;
//# sourceMappingURL=LayerIdentity.js.map