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

export interface StepGenerator {
    // next(...) should return false iff there are more compute steps to be made, once true is returned it should always be true
    next: (commit: boolean, context: CanvasRenderingContext2D) => boolean;
}

interface Node {
    getBounds(): Bounds;

    draw(context: CanvasRenderingContext2D): void;

    steps(): StepGenerator;

    intersection(point: Point): Node;

    toImage(): HTMLCanvasElement;

    isHitEnabled(): boolean;

    setHitEnabled(value: boolean): void;
}

export default Node;
