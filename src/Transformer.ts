import Node, {Point} from './Node';
import Layer from './Layer';

abstract class Transformer extends Layer {
    abstract transform(point: Point): Point;

    abstract untransform(point: Point): Point;

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        super.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
    }
}

export default Transformer;
