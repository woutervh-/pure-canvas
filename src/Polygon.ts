import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

const zeroPoint: Point = {x: 0, y: 0};

export interface PolygonStyle {
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
    lineDash?: Array<number>;
}

export interface PolygonParameters extends PolygonStyle {
    points: Array<Array<Point>>;
}

class Polygon<T> extends NodeFixedBounds<T> {
    private points: Array<Array<Point>>;
    private strokeStyle: string;
    private lineWidth: number;
    private fillStyle: string;
    private lineDash: Array<number>;

    constructor({points, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, fillStyle = 'rgba(255, 255, 255, 1)', lineDash = []}: PolygonParameters) {
        // TODO: lineWidth to increase bounds

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points[i].length; j++) {
                minX = Math.min(minX, points[i][j].x);
                minY = Math.min(minY, points[i][j].y);
                maxX = Math.max(maxX, points[i][j].x);
                maxY = Math.max(maxY, points[i][j].y);
            }
        }
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.points = points;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
        this.lineDash = lineDash;
    }

    draw(context: CanvasRenderingContext2D): void {
        const oldStrokeStyle = context.strokeStyle;
        const oldLineWidth = context.lineWidth;
        const oldFillStyle = context.fillStyle;
        const oldLineDash = context.getLineDash();
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.fillStyle;

        context.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            // TODO:
            // Given an option 'automaticCounterHoles' => automatically reverse the 2nd, 3rd, 4th, etc. polygons
            // For now just force API user to make sure holes are in counter-clockwise direction
            if (this.points[i].length >= 1) {
                const {x, y} = this.points[i][0];
                context.moveTo(x, y);
            }
            for (let j = 1; j < this.points[i].length; j++) {
                const {x, y} = this.points[i][j];
                context.lineTo(x, y);
            }
            context.closePath();
        }
        context.fill();
        if (this.lineWidth > 0) {
            context.setLineDash(this.lineDash);
            context.stroke();
        }

        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.fillStyle = oldFillStyle;
        if (this.lineWidth > 0) {
            context.setLineDash(oldLineDash);
        }
    }

    intersection({x, y}: Point): Polygon<T> | undefined {
        const vertices: Array<Point> = [];

        // TODO: algorithm should take lineWidth into account

        vertices.push(zeroPoint);
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                vertices.push(this.points[i][j]);
            }
            if (this.points[i].length >= 1) {
                vertices.push(this.points[i][0]);
            }
            vertices.push(zeroPoint);
        }

        let inside = false;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            if (((vertices[i].y > y) !== (vertices[j].y > y)) && (x < (vertices[j].x - vertices[i].x) * (y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
                inside = !inside;
            }
        }

        if (inside) {
            return this;
        }
    }
}

export default Polygon;
