import Node, {Point, Bounds} from './Node';
import NodeBasic from './NodeBasic';

abstract class NodeLeaf extends NodeBasic {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    index(action: (node: Node, origin: Point, zIndex: number, bounds: Bounds) => void, origin: Point, zIndex: number): void {
        action(this, origin, zIndex, this.getBounds());
    }
}

export default NodeLeaf;
