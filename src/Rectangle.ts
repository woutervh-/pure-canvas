import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface RectangleParameters {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}

class Rectangle<T> extends NodeFixedBounds<T> {
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private strokeStyle: string;
    private lineWidth: number;
    private fillStyle: string;

    constructor({x1, y1, x2, y2, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, fillStyle = 'rgba(255, 255, 255, 1)'}: RectangleParameters) {
        const minX = Math.min(x1, x2) - lineWidth / 2;
        const maxX = Math.max(x1, x2) + lineWidth / 2;
        const minY = Math.min(y1, y2) - lineWidth / 2;
        const maxY = Math.max(y1, y2) + lineWidth / 2;
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {x1, y1, x2, y2, strokeStyle, lineWidth, fillStyle} = this;

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

    intersection({x: px, y: py}: Point): Rectangle<T> | undefined {
        const {minX, minY, maxX, maxY} = this.getBounds();
        if (minX <= px && px <= maxX && minY <= py && py <= maxY) {
            return this;
        }
    }
}

export default Rectangle;
