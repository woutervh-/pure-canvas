"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, width = _a.width, height = _a.height, image = _a.image;
        _super.call(this, { minX: x, minY: y, maxX: x + width, maxY: y + height });
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    Image.prototype.draw = function (context) {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height, image = _a.image;
        try {
            context.drawImage(image, x, y, width, height);
        }
        catch (invalidStateError) {
        }
    };
    Image.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, ox = _b.x, oy = _b.y, width = _b.width, height = _b.height, image = _b.image;
        var rx = Math.round(x - ox);
        var ry = Math.round(y - oy);
        if (0 <= rx && rx <= width && 0 <= ry && ry <= height) {
            if (!this.pixelArray) {
                var hitCanvas = document.createElement('canvas');
                hitCanvas.width = width;
                hitCanvas.height = height;
                var hitContext = hitCanvas.getContext('2d');
                hitContext.drawImage(image, 0, 0, width, height);
                this.pixelArray = hitContext.getImageData(0, 0, width, height).data;
            }
            if (this.pixelArray[(rx + ry * width) * 4 + 3] >= 1) {
                return this;
            }
        }
    };
    return Image;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Image;
//# sourceMappingURL=Image.js.map