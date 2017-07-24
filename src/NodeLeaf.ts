import Node, {Point, Bounds} from './Node';
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

    private generator = (context?: CanvasRenderingContext2D) => {
        if (context) {
            this.draw(context);
        }
        return true;
    };

    steps(): (context?: CanvasRenderingContext2D) => boolean {
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
