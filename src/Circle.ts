import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface CircleStyle {
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
    lineDash?: Array<number>;
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
    private lineDash: Array<number>;

    constructor({x = 0, y = 0, radius, lineWidth = 1, strokeStyle = 'rgba(0, 0, 0, 1)', fillStyle = 'rgba(255, 255, 255, 1)', lineDash = []}: CircleParameters) {
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
        this.lineDash = lineDash;
    }

    draw(context: CanvasRenderingContext2D): void {
        const oldStrokeStyle = context.strokeStyle;
        const oldFillStyle = context.fillStyle;
        const oldLineWidth = context.lineWidth;
        const oldLineDash = context.getLineDash();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.fill();
        if (this.lineWidth > 0) {
            context.setLineDash(this.lineDash);
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.fillStyle = oldFillStyle;
        context.lineWidth = oldLineWidth;
        if (this.lineWidth > 0) {
            context.setLineDash(oldLineDash);
        }
    }

    intersection({x, y}: Point): Circle<T> | undefined {
        if ((x - this.x) ** 2 + (y - this.y) ** 2 <= (this.radius + this.lineWidth / 2) ** 2) {
            return this;
        }
    }
}

export default Circle;
