import Node, {Bounds, Point} from './Node';

abstract class NodeBasic implements Node {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    toImage(): HTMLCanvasElement {
        const {x, y, width, height} = this.getBounds();
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.draw(canvas.getContext('2d'));
        return canvas;
    }

    abstract index(action: (node: Node, origin: Point, zIndex: number, bounds: Bounds) => void, origin: Point, zIndex: number): void;
}

export default NodeBasic;
