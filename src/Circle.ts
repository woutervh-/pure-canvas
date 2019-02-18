import Arc from './Arc';
import { Point } from './Node';

export interface CircleStyle {
    radius: number;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
    lineDash?: Array<number>;
}

export interface CircleParameters extends CircleStyle, Partial<Point> {
}

class Circle<T> extends Arc<T> {
    constructor(parameters: CircleParameters) {
        super({...parameters, startAngle: 0, endAngle: 2 * Math.PI});
    }
}

export default Circle;
