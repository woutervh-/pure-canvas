"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
const measurementCanvas = document.createElement('canvas');
measurementCanvas.width = 0;
measurementCanvas.height = 0;
const measurementContext = measurementCanvas.getContext('2d');
function measureWidth(font, text) {
    measurementContext.font = font;
    return measurementContext.measureText(text).width;
}
class Text extends NodeFixedBounds_1.default {
    constructor({ x = 0, y = 0, fillStyle = 'rgba(0, 0, 0, 1)', fontStyle = 'normal', fontVariant = 'normal', fontWeight = 'normal', fontSize = 10, fontFamily = 'sans-serif', text }) {
        super({ minX: x, minY: y, maxX: x + measureWidth(`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`, text), maxY: y - fontSize });
        /* The following three values are necessary to guarantee correct measurements */
        this.textBaseline = 'alphabetic';
        this.textAlign = 'start';
        this.direction = 'ltr';
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
        this.text = text;
    }
    draw(context) {
        const { x, y, fillStyle, font, text, textBaseline, textAlign, direction } = this;
        const oldFont = context.font;
        const oldFillStyle = context.fillStyle;
        const oldTextBaseline = context.textBaseline;
        const oldTextAlign = context.textAlign;
        const oldDirection = context.direction;
        console.log(font);
        context.font = font;
        context.fillStyle = fillStyle;
        context.textBaseline = textBaseline;
        context.textAlign = textAlign;
        context.direction = direction;
        context.fillText(text, x, y);
        context.font = oldFont;
        context.fillStyle = oldFillStyle;
        context.textBaseline = oldTextBaseline;
        context.textAlign = oldTextAlign;
        context.direction = oldDirection;
    }
    intersection({ x: px, y: py }) {
        const { minX, minY, maxX, maxY } = this.getBounds();
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    }
}
exports.default = Text;
//# sourceMappingURL=Text.js.map