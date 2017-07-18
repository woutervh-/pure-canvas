"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
class Circle extends NodeFixedBounds_1.default {
    constructor({ x = 0, y = 0, radius, lineWidth = 1, strokeStyle = 'rgba(0, 0, 0, 1)', fillStyle = 'rgba(255, 255, 255, 1)' }) {
        const minX = x - radius - lineWidth / 2;
        const minY = y - radius - lineWidth / 2;
        const maxX = x + radius + lineWidth / 2;
        const maxY = y + radius + lineWidth / 2;
        const bounds = { minX, minY, maxX, maxY };
        super(bounds);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }
    draw(context) {
        const { x, y, radius, strokeStyle, lineWidth, fillStyle } = this;
        const oldStrokeStyle = context.strokeStyle;
        const oldFillStyle = context.fillStyle;
        const oldLineWidth = context.lineWidth;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
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
    intersection({ x, y }) {
        const { x: ox, y: oy, radius, lineWidth } = this;
        if (Math.pow((x - ox), 2) + Math.pow((y - oy), 2) <= Math.pow((radius + lineWidth / 2), 2)) {
            return this;
        }
    }
}
exports.default = Circle;
//# sourceMappingURL=Circle.js.map