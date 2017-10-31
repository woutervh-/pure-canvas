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
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    intersection(point: Point): Node | undefined;
    toImage(): HTMLCanvasElement;
    isHitEnabled(): boolean;
    setHitEnabled(value: boolean): void;
}
export default Node;
