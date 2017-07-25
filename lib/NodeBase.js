"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeBase {
    toImage() {
        const { minX, minY, maxX, maxY } = this.getBounds();
        const canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        const context = canvas.getContext('2d');
        context.translate(-minX, -minY);
        this.draw(context);
        context.translate(minX, minY);
        return canvas;
    }
}
exports.default = NodeBase;
//# sourceMappingURL=NodeBase.js.map