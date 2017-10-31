"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
const util_1 = require("./util");
const measurementCanvas = document.createElement('canvas');
measurementCanvas.width = 0;
measurementCanvas.height = 0;
const measurementContext = util_1.getSafeContext(measurementCanvas);
function measureWidth(font, text) {
    measurementContext.font = font;
    return measurementContext.measureText(text).width;
}
function getBounds(x, y, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, textBaseline, textAlign, text) {
    const width = measureWidth(`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`, text);
    let startY = 0;
    if (textBaseline === 'top' || textBaseline === 'hanging') {
        startY = 0;
    }
    else if (textBaseline === 'middle') {
        startY = -fontSize / 2;
    }
    else if (textBaseline === 'alphabetic' || textBaseline === 'ideographic' || textBaseline === 'bottom') {
        startY = -fontSize;
    }
    let startX = 0;
    if (textAlign === 'left' || textAlign === 'start') {
        startX = 0;
    }
    else if (textAlign === 'center') {
        startX = -width / 2;
    }
    else if (textAlign === 'right' || textAlign === 'end') {
        startX = -width;
    }
    return { minX: x + startX, minY: y + startY, maxX: x + startX + width, maxY: y + startY + fontSize };
}
class Text extends NodeFixedBounds_1.default {
    constructor({ x = 0, y = 0, fillStyle = 'rgba(0, 0, 0, 1)', fontStyle = 'normal', fontVariant = 'normal', fontWeight = 'normal', fontSize = 10, fontFamily = 'sans-serif', textBaseline = 'alphabetic', textAlign = 'start', text }) {
        super(getBounds(x, y, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, textBaseline, textAlign, text));
        /* The following value is necessary to guarantee correct measurements */
        this.direction = 'ltr';
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
        this.textBaseline = textBaseline;
        this.textAlign = textAlign;
        this.text = text;
    }
    draw(context) {
        const { x, y, fillStyle, font, text, textBaseline, textAlign, direction } = this;
        const oldFont = context.font;
        const oldFillStyle = context.fillStyle;
        const oldTextBaseline = context.textBaseline;
        const oldTextAlign = context.textAlign;
        const oldDirection = context.direction;
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