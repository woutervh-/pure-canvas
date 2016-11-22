export interface Bounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export interface Point {
    x: number;
    y: number;
}

interface Node {
    getBounds(): Bounds;

    draw(context: CanvasRenderingContext2D): void;

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void;

    intersection(point: Point): Node;

    toImage(): HTMLCanvasElement;

    isHitEnabled(): boolean;

    setHitEnabled(value: boolean): void;
}

export default Node;
