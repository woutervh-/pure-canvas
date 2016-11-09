"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeBasic_1 = require('./NodeBasic');
var emptyTransformers = [];
var NodeLeaf = (function (_super) {
    __extends(NodeLeaf, _super);
    function NodeLeaf() {
        _super.apply(this, arguments);
        this.hitEnabled = false;
    }
    NodeLeaf.prototype.index = function (action, zIndex) {
        action(this, zIndex, emptyTransformers);
    };
    NodeLeaf.prototype.isHitEnabled = function () {
        return this.hitEnabled;
    };
    NodeLeaf.prototype.setHitEnabled = function (value) {
        this.hitEnabled = value;
    };
    return NodeLeaf;
}(NodeBasic_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeLeaf;
//# sourceMappingURL=NodeLeaf.js.map