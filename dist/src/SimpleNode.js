"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractNode_1 = require('./AbstractNode');
var SimpleNode = (function (_super) {
    __extends(SimpleNode, _super);
    function SimpleNode(bounds) {
        _super.call(this);
        this.bounds = bounds;
    }
    SimpleNode.prototype.getBounds = function () {
        return this.bounds;
    };
    return SimpleNode;
}(AbstractNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SimpleNode;
//# sourceMappingURL=SimpleNode.js.map