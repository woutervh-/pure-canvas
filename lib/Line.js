"use strict";
const NodeFixedBounds_1 = require('./NodeFixedBounds');
class Line extends NodeFixedBounds_1.default {
    constructor({ x1, y1, x2, y2, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, lineCap = 'butt' }) {
        const minX = Math.min(x1, x2) - lineWidth / 2;
        const minY = Math.min(y1, y2) - lineWidth / 2;
        const maxX = Math.max(x1, x2) + lineWidth / 2;
        const maxY = Math.max(y1, y2) + lineWidth / 2;
        const bounds = { minX, minY, maxX, maxY };
        super(bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
    }
    draw(context) {
        const { x1, y1, x2, y2, strokeStyle, lineWidth, lineCap } = this;
        const oldStrokeStyle = context.strokeStyle;
        const oldLineWidth = context.lineWidth;
        const oldLineCap = context.lineCap;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.lineCap = oldLineCap;
    }
    intersection({ x, y }) {
        const { x1, y1, x2, y2, lineWidth } = this;
        const distance2 = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
        let t;
        if (distance2 === 0) {
            t = 0;
        }
        else {
            t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / distance2;
        }
        if (0 <= t && t <= 1) {
            const dx = x - (x1 + t * (x2 - x1));
            const dy = y - (y1 + t * (y2 - y1));
            if (Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow((lineWidth / 2), 2)) {
                return this;
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Line;
//# sourceMappingURL=Line.js.map