import Node, {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface MultiPolygonParameters {
    points: Array<Array<{x: number, y: number}>>;
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}

class MultiPolygon extends NodeFixedBounds {
    private points: Array<Array<{x: number, y: number}>>;
    private strokeStyle: string;
    private lineWidth: number;
    private fillStyle: string;

    constructor({points, strokeStyle = 'rgba(0, 0, 0, 1)', lineWidth = 1, fillStyle = 'rgba(255, 255, 255, 1)'}: MultiPolygonParameters) {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points[i].length; j++) {
                minX = Math.min(minX, points[i][j].x);
                maxX = Math.max(maxX, points[i][j].x);
                minY = Math.min(minY, points[i][j].y);
                maxY = Math.max(maxY, points[i][j].y);
            }
        }
        const bounds: Bounds = {minX, minY, maxX, maxY};

        super(bounds);
        this.points = points;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {points, strokeStyle, lineWidth, fillStyle} = this;

        const oldStrokeStyle = context.strokeStyle;
        const oldLineWidth = context.lineWidth;
        const oldFillStyle = context.fillStyle;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.fillStyle = fillStyle;

        context.beginPath();
        for (let i = 0; i < points.length; i++) {
            // TODO:
            // Given an option 'automaticCounterHoles' => automatically reverse the 2nd, 3rd, 4th, etc. polygons
            // For now just force API user to make sure holes are in counter-clockwise direction
            if (points[i].length >= 1) {
                const {x, y} = points[i][0];
                context.moveTo(x, y);
            }
            for (let j = 1; j < points[i].length; j++) {
                const {x, y} = points[i][j];
                context.lineTo(x, y);
            }
            context.closePath();
        }
        context.fill();
        if (lineWidth > 0) {
            context.stroke();
        }

        context.strokeStyle = oldStrokeStyle;
        context.lineWidth = oldLineWidth;
        context.fillStyle = oldFillStyle;
    }

    intersection({x, y}: Point): Node {
        // const {x1, y1, x2, y2, lineWidth} = this;
        // const distance2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
        // let t: number;
        // if (distance2 === 0) {
        //     t = 0;
        // } else {
        //     t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / distance2;
        // }
        // if (0 <= t && t <= 1) {
        //     const dx = x - (x1 + t * (x2 - x1));
        //     const dy = y - (y1 + t * (y2 - y1));
        //     if (dx ** 2 + dy ** 2 <= (lineWidth / 2) ** 2) {
        //         return this;
        //     }
        // }
        // TODO
        return this;
    }
}

export default MultiPolygon;
