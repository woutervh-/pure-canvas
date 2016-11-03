import {default as Node, Bounds, Point} from './Node';

abstract class BoundedNode implements Node {
    private bounds: Bounds;

    constructor(bounds) {
        this.bounds = bounds;
    }

    getBounds(): Bounds {
        return this.bounds;
    }

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersects(point: Point): boolean;
}

export default BoundedNode;
