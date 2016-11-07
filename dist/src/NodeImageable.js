"use strict";
var NodeImageable = (function () {
    function NodeImageable() {
    }
    NodeImageable.prototype.toImage = function () {
        var _a = this.getBounds(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.draw(canvas.getContext('2d'));
        return canvas;
    };
    return NodeImageable;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeImageable;
//# sourceMappingURL=NodeImageable.js.map