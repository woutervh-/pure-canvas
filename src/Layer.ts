import Node, {Point, Bounds} from './Node';
import NodeIndexable from './NodeIndexable';
import NodeBase from './NodeBase';
import Transformer from './Transformer';

class Layer<T> extends NodeBase<T> {
    private hitEnabled: boolean = true;

    protected children: Iterable<NodeIndexable<T>>;

    constructor(children: Iterable<NodeIndexable<T>> = []) {
        super();
        this.children = children;
    }

    setChildren(children: Iterable<NodeIndexable<T>>) {
        this.children = children;
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const child of this.children) {
            child.draw(context);
        }
    }

    steps(): (context?: CanvasRenderingContext2D) => boolean {
        const generators = Array.from(this.children).map((child) => child.steps());
        let index = 0;
        return (context) => {
            if (context) {
                for (const generator of generators) {
                    generator(context);
                }
            } else {
                if (index < generators.length) {
                    if (generators[index]()) {
                        index += 1;
                    }
                }
            }
            return index >= generators.length;
        };
    }

    getBounds(): Bounds {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (const child of this.children) {
            const {minX: childMinX, minY: childMinY, maxX: childMaxX, maxY: childMaxY} = child.getBounds();
            minX = Math.min(minX, childMinX);
            minY = Math.min(minY, childMinY);
            maxX = Math.max(maxX, childMaxX);
            maxY = Math.max(maxY, childMaxY);
        }

        return {minX, minY, maxX, maxY};
    }

    intersection(point: Point): Node<T> | undefined {
        // Visit children in reverse order: the ones drawn last must be checked first
        for (const child of Array.from(this.children).reverse()) {
            if (child.isHitEnabled()) {
                const intersection = child.intersection(point);
                if (!!intersection) {
                    return intersection;
                }
            }
        }
    }

    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number {
        for (const child of this.children) {
            if (child.isHitEnabled()) {
                zIndex = child.index(action, zIndex, transformers) + 1;
            }
        }
        return zIndex;
    }

    isHitEnabled(): boolean {
        return this.hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this.hitEnabled = value;
    }
}

export default Layer;
