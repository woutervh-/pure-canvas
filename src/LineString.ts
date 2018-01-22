import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface LineStringStyle {
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
    lineDash?: Array<number>;
}

export interface LineStringParameters extends LineStringStyle {
    points: Array<Point>;
}

class LineString<T> extends NodeFixedBounds<T> {
    private points: Array<Point>;
    private strokeStyle: string;
    private lineWidth: number;
    private lineCap: string;
    private lineDash: Array<number>;

    constructor({points, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, lineCap = 'butt', lineDash = []}: LineStringParameters) {
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].x - lineWidth / 2);
            minY = Math.min(minY, points[i].y - lineWidth / 2);
            maxX = Math.max(maxX, points[i].x + lineWidth / 2);
            maxY = Math.max(maxY, points[i].y + lineWidth / 2);
        }
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.points = points;
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
        if (this.points.length >= 1) {
            const {x, y} = this.points[0];
            context.moveTo(x, y);
        }
        for (let i = 1; i < this.points.length; i++) {
            const {x, y} = this.points[i];
            context.lineTo(x, y);
        }
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

    intersection({x, y}: Point): Node<T> | undefined {
        for (let i = 1; i < this.points.length; i++) {
            const {x: x1, y: y1} = this.points[i - 1];
            const {x: x2, y: y2} = this.points[i];
            const distance2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
            let t: number;
            if (distance2 === 0) {
                t = 0;
            } else {
                t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / distance2;
            }
            if (0 <= t && t <= 1) {
                const dx = x - (x1 + t * (x2 - x1));
                const dy = y - (y1 + t * (y2 - y1));
                if (dx ** 2 + dy ** 2 <= (this.lineWidth / 2) ** 2) {
                    return this;
                }
            }
        }
    }
}

export default LineString;
