"use strict";
var InitiallyBoundNode = (function () {
    function InitiallyBoundNode(bounds) {
        this.bounds = bounds;
    }
    InitiallyBoundNode.prototype.getBounds = function () {
        return this.bounds;
    };
    return InitiallyBoundNode;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InitiallyBoundNode;
//# sourceMappingURL=InitiallyBoundNode.js.map