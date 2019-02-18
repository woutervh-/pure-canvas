import {Bounds, Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

const PI_2 = Math.PI * 2;

export interface ArcStyle {
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
    lineDash?: Array<number>;
    closed?: boolean;
}

export interface ArcParameters extends ArcStyle, Partial<Point> {
    startAngle: number;
    endAngle: number;
    counterClockwise?: boolean;
}

class Arc<T> extends NodeFixedBounds<T> {
    protected x: number;
    protected y: number;
    protected radius: number;
    protected lineWidth: number;
    protected strokeStyle: string;
    protected fillStyle: string;
    protected lineDash: Array<number>;
    protected startAngle: number;
    protected endAngle: number;
    protected closed: boolean;
    protected counterClockwise: boolean;

    constructor({x = 0, y = 0, radius, lineWidth = 1, strokeStyle = 'rgba(0, 0, 0, 1)', fillStyle = 'rgba(255, 255, 255, 1)', lineDash = [], startAngle = 0, endAngle = PI_2, closed = false, counterClockwise = false}: ArcParameters) {
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
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.closed = closed;
        this.counterClockwise = counterClockwise;
    }

    draw(context: CanvasRenderingContext2D): void {
        const oldStrokeStyle = context.strokeStyle;
        const oldFillStyle = context.fillStyle;
        const oldLineWidth = context.lineWidth;
        const oldLineDash = context.getLineDash();

        context.beginPath();

        if (!this.isCircle()) {
            context.moveTo(this.x, this.y);
        }

        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;

        context.closePath();

        context.fill();

        if (this.lineWidth > 0) {
            if (this.closed) {
                context.setLineDash(this.lineDash);
                context.stroke();
            } else {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
                context.stroke();
            }
        }


        context.strokeStyle = oldStrokeStyle;
        context.fillStyle = oldFillStyle;
        context.lineWidth = oldLineWidth;

        if (this.lineWidth > 0) {
            context.setLineDash(oldLineDash);
        }
    }

    intersection({x, y}: Point): Arc<T> | undefined {
        const deltaX = x - this.x;
        const deltaY = y - this.y;

        if (deltaX ** 2 + deltaY ** 2 <= (this.radius + this.lineWidth / 2) ** 2) {
            if (this.isCircle()) {
                return this;
            } else {
                const angle = Math.atan2(deltaY, deltaX);
                const startAngle = this.normalizeAngle(this.startAngle);
                const endAngle = this.normalizeAngle(this.endAngle);

                if ((this.counterClockwise && this.isAngleBetween(angle, endAngle, startAngle))
                    || (!this.counterClockwise && this.isAngleBetween(angle, startAngle, endAngle))) {
                    return this;
                }
            }
        }
    }

    private normalizeAngle(angle: number) {

        while(angle < -Math.PI) {
            angle += PI_2;
        }

        while(angle > Math.PI) {
            angle -= PI_2;
        }

        return angle;
    }

    private isAngleBetween(angle: number, start: number, end: number) {
        return this.deltaAngles(start, end) >= this.deltaAngles(start, angle);
    }

    private deltaAngles(start: number, end: number) {
        let distance = end - start;
        if (start > end) {
           distance += PI_2;
        }
        return distance;
    }

    private isCircle() {
            const inverted = this.counterClockwise != this.endAngle < this.startAngle;
            const delta = this.endAngle - this.startAngle;

            if (inverted) {
                return delta <= -PI_2;
            } else {
                return delta >= PI_2;
            }
    }
}

export default Arc;
