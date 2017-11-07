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

interface Node<T = any> {
    getBounds(): Bounds;

    draw(context: CanvasRenderingContext2D): void;
    
    steps(): (context?: CanvasRenderingContext2D) => boolean;

    intersection(point: Point): Node<T> | undefined;

    toImage(): HTMLCanvasElement;

    isHitEnabled(): boolean;

    setHitEnabled(value: boolean): void;

    properties?: T;
}

export default Node;
