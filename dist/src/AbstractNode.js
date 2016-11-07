"use strict";
var AbstractNode = (function () {
    function AbstractNode() {
    }
    AbstractNode.prototype.toImage = function () {
        var _a = this.getBounds(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.draw(canvas.getContext('2d'));
        return canvas;
    };
    return AbstractNode;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractNode;
//# sourceMappingURL=AbstractNode.js.map