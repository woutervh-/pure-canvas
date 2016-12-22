"use strict";
var NodeBasic = (function () {
    function NodeBasic() {
    }
    NodeBasic.prototype.toImage = function (clipRegion) {
        var _a = clipRegion ? clipRegion : this.getBounds(), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        var _b = clipRegion ? this.getBounds() : { minX: minX, minY: minY }, realMinX = _b.minX, realMinY = _b.minY;
        var canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        var context = canvas.getContext('2d');
        context.translate(-realMinX - minX, -realMinY - minY);
        this.draw(context);
        context.translate(realMinX + minX, realMinY + minY);
        return canvas;
    };
    return NodeBasic;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeBasic;
//# sourceMappingURL=NodeBasic.js.map