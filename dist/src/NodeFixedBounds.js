"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeImageable_1 = require('./NodeImageable');
var NodeFixedBounds = (function (_super) {
    __extends(NodeFixedBounds, _super);
    function NodeFixedBounds(bounds) {
        _super.call(this);
        this.bounds = bounds;
    }
    NodeFixedBounds.prototype.getBounds = function () {
        return this.bounds;
    };
    return NodeFixedBounds;
}(NodeImageable_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeFixedBounds;
//# sourceMappingURL=NodeFixedBounds.js.map