import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface CircleParameters {
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
}

class Circle extends NodeFixedBounds {
    private radius: number;
    private lineWidth: number;
    private strokeStyle: string;
    private fillStyle: string;

    constructor({radius, lineWidth = 1, strokeStyle = 'rgba(0, 0, 0, 1)', fillStyle = 'rgba(255, 255, 255, 1)'}: CircleParameters) {
        const minX = -radius - lineWidth / 2;
        const minY = -radius - lineWidth / 2;
        const maxX = radius + lineWidth / 2;
        const maxY = radius + lineWidth / 2;
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {radius, strokeStyle, lineWidth, fillStyle} = this;
        const oldStrokeStyle = context.strokeStyle;
        const oldFillStyle = context.fillStyle;
        const oldLineWidth = context.lineWidth;
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI, false);
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

    intersection({x, y}: Point): Node {
        const {radius, lineWidth} = this;
        if (x ** 2 + y ** 2 <= (radius + lineWidth / 2) ** 2) {
            return this;
        }
    }
}

export default Circle;
