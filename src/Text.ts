import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';
import {getSafeContext} from './util';

const measurementCanvas = document.createElement('canvas');
measurementCanvas.width = 0;
measurementCanvas.height = 0;
const measurementContext = getSafeContext(measurementCanvas);

function measureWidth(font: string, text: string): number {
    measurementContext.font = font;
    return measurementContext.measureText(text).width;
}

function getBounds(x: number, y: number, fontStyle: string, fontVariant: string, fontWeight: string, fontSize: number, fontFamily: string, textBaseline: string, textAlign: string, text: string): Bounds {
    const width = measureWidth(`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`, text);
    let startY = 0;
    if (textBaseline === 'top' || textBaseline === 'hanging') {
        startY = 0;
    } else if (textBaseline === 'middle') {
        startY = -fontSize / 2;
    } else if (textBaseline === 'alphabetic' || textBaseline === 'ideographic' || textBaseline === 'bottom') {
        startY = -fontSize;
    }
    let startX = 0;
    if (textAlign === 'left' || textAlign === 'start') {
        startX = 0;
    } else if (textAlign === 'center') {
        startX = -width / 2;
    } else if (textAlign === 'right' || textAlign === 'end') {
        startX = -width;
    }
    return {minX: x + startX, minY: y + startY, maxX: x + startX + width, maxY: y + startY + fontSize};
}

export interface TextParameters {
    x?: number;
    y?: number;
    fillStyle?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    fontSize?: number;
    fontFamily?: string;
    textBaseline?: string;
    textAlign?: string;
    text: string;
}

class Text extends NodeFixedBounds {
    private x: number;
    private y: number;
    private fillStyle: string;
    private font: string;
    private text: string;
    private textBaseline: string;
    private textAlign: string;
    /* The following value is necessary to guarantee correct measurements */
    private direction: string = 'ltr';

    constructor({x = 0, y = 0, fillStyle = 'rgba(0, 0, 0, 1)', fontStyle = 'normal', fontVariant = 'normal', fontWeight = 'normal', fontSize = 10, fontFamily = 'sans-serif', textBaseline = 'alphabetic', textAlign = 'start', text}: TextParameters) {
        super(getBounds(x, y, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, textBaseline, textAlign, text));
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
        this.textBaseline = textBaseline;
        this.textAlign = textAlign;
        this.text = text;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {x, y, fillStyle, font, text, textBaseline, textAlign, direction} = this;
        const oldFont = context.font;
        const oldFillStyle = context.fillStyle;
        const oldTextBaseline = context.textBaseline;
        const oldTextAlign = context.textAlign;
        const oldDirection = (context as any).direction;
        context.font = font;
        context.fillStyle = fillStyle;
        context.textBaseline = textBaseline;
        context.textAlign = textAlign;
        (context as any).direction = direction;
        context.fillText(text, x, y);
        context.font = oldFont;
        context.fillStyle = oldFillStyle;
        context.textBaseline = oldTextBaseline;
        context.textAlign = oldTextAlign;
        (context as any).direction = oldDirection;
    }

    intersection({x: px, y: py}: Point): Node | undefined {
        const {minX, minY, maxX, maxY} = this.getBounds();
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    }
}

export default Text;
