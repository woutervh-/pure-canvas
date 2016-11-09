import Node, {Point, Bounds} from './Node';
import NodeBasic from './NodeBasic';
import Transformer from './Transformer';

const emptyTransformers: Array<Transformer> = [];

abstract class NodeLeaf extends NodeBasic {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        action(this, zIndex, emptyTransformers);
    }
}

export default NodeLeaf;
