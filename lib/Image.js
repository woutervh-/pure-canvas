"use strict";
const NodeFixedBounds_1 = require('./NodeFixedBounds');
class Image extends NodeFixedBounds_1.default {
    constructor({ x = 0, y = 0, width, height, image }) {
        super({ minX: x, minY: y, maxX: x + width, maxY: y + height });
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    draw(context) {
        const { x, y, width, height, image } = this;
        try {
            context.drawImage(image, x, y, width, height);
        }
        catch (invalidStateError) {
        }
    }
    intersection({ x, y }) {
        const { x: ox, y: oy, width, height, image } = this;
        const rx = Math.round(x - ox);
        const ry = Math.round(y - oy);
        if (0 <= rx && rx <= width && 0 <= ry && ry <= height) {
            if (!this.pixelArray) {
                const hitCanvas = document.createElement('canvas');
                hitCanvas.width = width;
                hitCanvas.height = height;
                const hitContext = hitCanvas.getContext('2d');
                try {
                    hitContext.drawImage(image, 0, 0, width, height);
                }
                catch (invalidStateError) {
                }
                this.pixelArray = hitContext.getImageData(0, 0, width, height).data;
            }
            if (this.pixelArray[(rx + ry * width) * 4 + 3] >= 1) {
                return this;
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Image;
//# sourceMappingURL=Image.js.map