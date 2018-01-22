import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface LineStyle {
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
    lineDash?: Array<number>;
}

export interface LineParameters extends LineStyle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

class Line<T> extends NodeFixedBounds<T> {
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private strokeStyle: string;
    private lineWidth: number;
    private lineCap: string;
    private lineDash: Array<number>;

    constructor({x1, y1, x2, y2, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, lineCap = 'butt', lineDash = []}: LineParameters) {
        const minX = Math.min(x1, x2) - lineWidth / 2;
        const minY = Math.min(y1, y2) - lineWidth / 2;
        const maxX = Math.max(x1, x2) + lineWidth / 2;
        const maxY = Math.max(y1, y2) + lineWidth / 2;
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineCap = lineCap;
        this.lineDash = lineDash;
    }

    draw(context: CanvasRenderingContext2D): void {
        const oldStrokeStyle = context.strokeStyle;
        const oldLineWidth = context.lineWidth;
        const oldLineCap = context.lineCap;
        const oldLineDash = context.getLineDash();
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.lineCap = this.lineCap;
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        if (this.lineWidth > 0) {
            context.setLineDash(this.lineDash);
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.lineCap = oldLineCap;
        if (this.lineWidth > 0) {
            context.setLineDash(oldLineDash);
        }
    }

    intersection({x, y}: Point): Line<T> | undefined {
        const distance2 = (this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2;
        let t: number;
        if (distance2 === 0) {
            t = 0;
        } else {
            t = ((x - this.x1) * (this.x2 - this.x1) + (y - this.y1) * (this.y2 - this.y1)) / distance2;
        }
        if (0 <= t && t <= 1) {
            const dx = x - (this.x1 + t * (this.x2 - this.x1));
            const dy = y - (this.y1 + t * (this.y2 - this.y1));
            if (dx ** 2 + dy ** 2 <= (this.lineWidth / 2) ** 2) {
                return this;
            }
        }
    }
}

export default Line;
