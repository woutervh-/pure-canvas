import Node, {Bounds, Point} from './Node';
import * as rbush from 'rbush';

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

    abstract index(action: (node: Node, origin: Point, bbox: rbush.BBox) => void): void;
}

export default NodeBasic;
