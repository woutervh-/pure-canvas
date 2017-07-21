import Node, {Point, Bounds, StepGenerator} from './Node';
import NodeBasic from './NodeBasic';
import Transformer from './Transformer';

const emptyTransformers: Array<Transformer> = [];

abstract class NodeLeaf extends NodeBasic {
    private hitEnabled: boolean = false;

    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    constructor() {
        super();
    }

    private generator = {
        next: (commit, context) => {
            if (commit) {
                this.draw(context);
            }
            return true;
        }
    };

    steps(): StepGenerator {
        return this.generator;
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): number {
        action(this, zIndex, emptyTransformers);
        return zIndex;
    }

    isHitEnabled(): boolean {
        return this.hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this.hitEnabled = value;
    }
}

export default NodeLeaf;
