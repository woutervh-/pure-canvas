import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface CircleStyle {
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
}

export interface CircleParameters extends CircleStyle {
    x?: number;
    y?: number;
}

class Circle<T> extends NodeFixedBounds<T> {
    private x: number;
    private y: number;
    private radius: number;
    private lineWidth: number;
    private strokeStyle: string;
    private fillStyle: string;

    constructor({x = 0, y = 0, radius, lineWidth = 1, strokeStyle = 'rgba(0, 0, 0, 1)', fillStyle = 'rgba(255, 255, 255, 1)'}: CircleParameters) {
        const minX = x - radius - lineWidth / 2;
        const minY = y - radius - lineWidth / 2;
        const maxX = x + radius + lineWidth / 2;
        const maxY = y + radius + lineWidth / 2;
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {x, y, radius, strokeStyle, lineWidth, fillStyle} = this;
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

    intersection({x, y}: Point): Circle<T> | undefined {
        const {x: ox, y: oy, radius, lineWidth} = this;
        if ((x - ox) ** 2 + (y - oy) ** 2 <= (radius + lineWidth / 2) ** 2) {
            return this;
        }
    }
}

export default Circle;
