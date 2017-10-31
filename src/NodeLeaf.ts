import Node, {Point, Bounds} from './Node';
import NodeBase from './NodeBase';
import Transformer from './Transformer';

abstract class NodeLeaf extends NodeBase {
    private hitEnabled: boolean = false;

    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node | undefined;

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

    isHitEnabled(): boolean {
        return this.hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this.hitEnabled = value;
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number {
        action(this, zIndex, transformers);
        return zIndex;
    }
}

export default NodeLeaf;
