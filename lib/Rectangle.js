"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
class Rectangle extends NodeFixedBounds_1.default {
    constructor({ x1, y1, x2, y2, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, fillStyle = 'rgba(255, 255, 255, 1)' }) {
        const minX = Math.min(x1, x2) - lineWidth / 2;
        const maxX = Math.max(x1, x2) + lineWidth / 2;
        const minY = Math.min(y1, y2) - lineWidth / 2;
        const maxY = Math.max(y1, y2) + lineWidth / 2;
        const bounds = { minX, minY, maxX, maxY };
        super(bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
    }
    draw(context) {
        const { x1, y1, x2, y2, strokeStyle, lineWidth, fillStyle } = this;
        const oldStrokeStyle = context.strokeStyle;
        const oldFillStyle = context.fillStyle;
        const oldLineWidth = context.lineWidth;
        context.beginPath();
        context.rect(x1, y1, x2 - x1, y2 - y1);
        context.strokeStyle = strokeStyle;
        context.fillStyle = fillStyle;
        context.lineWidth = lineWidth;
        context.fill();
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.fillStyle = oldFillStyle;
        context.lineWidth = oldLineWidth;
    }
    intersection({ x: px, y: py }) {
        const { minX, minY, maxX, maxY } = this.getBounds();
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    }
}
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map