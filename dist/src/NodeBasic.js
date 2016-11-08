"use strict";
var NodeBasic = (function () {
    function NodeBasic() {
    }
    NodeBasic.prototype.toImage = function () {
        var _a = this.getBounds(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.draw(canvas.getContext('2d'));
        return canvas;
    };
    return NodeBasic;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeBasic;
//# sourceMappingURL=NodeBasic.js.map