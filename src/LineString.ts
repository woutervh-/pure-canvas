import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface LineStringStyle {
    strokeStyle?: string;
    lineWidth?: number;
    lineCap?: string;
}

export interface LineStringParameters extends LineStringStyle {
    points: Array<Point>;
}

class LineString<T> extends NodeFixedBounds<T> {
    private points: Array<Point>;
    private strokeStyle: string;
    private lineWidth: number;
    private lineCap: string;

    constructor({points, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, lineCap = 'butt'}: LineStringParameters) {
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
    }

    draw(context: CanvasRenderingContext2D): void {
        const {points, strokeStyle, lineWidth, lineCap} = this;

        const oldStrokeStyle = context.strokeStyle;
        const oldLineWidth = context.lineWidth;
        const oldLineCap = context.lineCap;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.beginPath();
        if (points.length >= 1) {
            const {x, y} = points[0];
            context.moveTo(x, y);
        }
        for (let i = 1; i < points.length; i++) {
            const {x, y} = this.points[i];
            context.lineTo(x, y);
        }
        if (lineWidth > 0) {
            context.stroke();
        }
        context.closePath();
        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.lineCap = oldLineCap;
    }

    intersection({x, y}: Point): Node<T> | undefined {
        const {points, lineWidth} = this;

        for (let i = 1; i < points.length; i++) {
            const {x: x1, y: y1} = points[i - 1];
            const {x: x2, y: y2} = points[i];
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
                if (dx ** 2 + dy ** 2 <= (lineWidth / 2) ** 2) {
                    return this;
                }
            }
        }
    }
}

export default LineString;
