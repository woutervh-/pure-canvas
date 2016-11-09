"use strict";
var NodeBasic = (function () {
    function NodeBasic() {
        this._hitEnabled = true;
    }
    NodeBasic.prototype.toImage = function () {
        var _a = this.getBounds(), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        var canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        this.draw(canvas.getContext('2d'));
        return canvas;
    };
    NodeBasic.prototype.isHitEnabled = function () {
        return this._hitEnabled;
    };
    NodeBasic.prototype.setHitEnabled = function (value) {
        this._hitEnabled = value;
    };
    return NodeBasic;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeBasic;
//# sourceMappingURL=NodeBasic.js.map