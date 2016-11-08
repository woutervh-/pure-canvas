import * as rbush from 'rbush';

export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

interface Node {
    getBounds(): Bounds;

    draw(context: CanvasRenderingContext2D): void;

    intersection(point: Point): Node;

    toImage(): HTMLCanvasElement;

    index(action: (node: Node, origin: Point, bbox: rbush.BBox) => void): void;
}

export default Node;
