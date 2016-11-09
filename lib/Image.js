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
        var width = _a.width, height = _a.height, image = _a.image;
        _super.call(this, { minX: 0, minY: 0, maxX: width, maxY: height });
        this.width = width;
        this.height = height;
        this.image = image;
    }
    Image.prototype.draw = function (context) {
        var _a = this, width = _a.width, height = _a.height, image = _a.image;
        try {
            context.drawImage(image, 0, 0, width, height);
        }
        catch (invalidStateError) {
        }
    };
    Image.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        var _b = this, width = _b.width, height = _b.height, image = _b.image;
        var rx = Math.round(x);
        var ry = Math.round(y);
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