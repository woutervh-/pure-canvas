import Node, {Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

const measurementCanvas = document.createElement('canvas');
measurementCanvas.width = 0;
measurementCanvas.height = 0;
const measurementContext = measurementCanvas.getContext('2d');

function measureWidth(font: string, text: string): number {
    measurementContext.font = font;
    return measurementContext.measureText(text).width;
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
    text: string;
}

class Text extends NodeFixedBounds {
    private x: number;
    private y: number;
    private fillStyle: string;
    private font: string;
    private text: string;
    /* The following three values are necessary to guarantee correct measurements */
    private textBaseline: string = 'alphabetic';
    private textAlign: string = 'start';
    private direction: string = 'ltr';

    constructor({x = 0, y = 0, fillStyle = 'rgba(0, 0, 0, 1)', fontStyle = 'normal', fontVariant = 'normal', fontWeight = 'normal', fontSize = 10, fontFamily = 'sans-serif', text}: TextParameters) {
        super({minX: x, minY: y - fontSize, maxX: x + measureWidth(`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`, text), maxY: y});
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
        this.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
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

    intersection({x: px, y: py}: Point): Node {
        const {minX, minY, maxX, maxY} = this.getBounds();
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    }
}

export default Text;
