"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class NodeBase {
    constructor() {
        this.properties = undefined;
    }
    toImage() {
        const { minX, minY, maxX, maxY } = this.getBounds();
        const canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        const context = util_1.getSafeContext(canvas);
        context.translate(-minX, -minY);
        this.draw(context);
        context.translate(minX, minY);
        return canvas;
    }
}
exports.default = NodeBase;
//# sourceMappingURL=NodeBase.js.map