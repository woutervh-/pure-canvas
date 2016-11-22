import Node, {Point, Bounds} from './Node';
import NodeBasic from './NodeBasic';
import Transformer from './Transformer';

const emptyTransformers: Array<Transformer> = [];

abstract class NodeLeaf extends NodeBasic {
    private hitEnabled: boolean = false;

    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void {
        commitAccumulator.push(() => this.draw(context));
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        action(this, zIndex, emptyTransformers);
    }

    isHitEnabled(): boolean {
        return this.hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this.hitEnabled = value;
    }
}

export default NodeLeaf;
