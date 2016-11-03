"use strict";
var BoundedNode = (function () {
    function BoundedNode(bounds) {
        this.bounds = bounds;
    }
    BoundedNode.prototype.getBounds = function () {
        return this.bounds;
    };
    return BoundedNode;
}());
exports.__esModule = true;
exports["default"] = BoundedNode;
//# sourceMappingURL=BoundedNode.js.map