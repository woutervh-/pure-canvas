import Node, {Point, Bounds} from './Node';
import NodeIndexable from './NodeIndexable';
import NodeCollection from './NodeCollection';
import NodeBasic from './NodeBasic';
import Transformer from './Transformer';
import TreeManager from './TreeManager';

class Layer extends NodeBasic implements NodeCollection {
    private hitEnabled: boolean = true;

    private treeManager: TreeManager = new TreeManager();

    protected children: Array<NodeIndexable> = [];

    constructor() {
        super();
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const child of this.children) {
            child.draw(context);
        }
    }

    steps(): (context?: CanvasRenderingContext2D) => boolean {
        const generators = this.children.map((child) => child.steps());
        let index = 0;
        return (context) => {
            if (context) {
                for (const generator of generators) {
                    generator(context);
                }
            } else {
                if (index < this.children.length) {
                    if (generators[index]()) {
                        index += 1;
                    }
                }
            }
            return index >= this.children.length;
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

    add(node: NodeIndexable, transformer?: Transformer): number {
        this.children.push(node);
        if (this.isHitEnabled()) {
            this.treeManager.index(node, this.children.length - 1, transformer);
        }
        return this.children.length - 1;
    }

    remove(a: number | NodeIndexable): void {
        if (typeof a === 'number') {
            if (this.isHitEnabled()) {
                this.treeManager.remove(this.children[a]);
            }
            this.children.splice(a, 1);
        } else {
            this.remove(this.children.indexOf(a));
        }
    }

    removeAll(): void {
        this.children = [];
        if (this.isHitEnabled()) {
            this.treeManager.clear();
        }
    }

    count(): number {
        return this.children.length;
    }

    intersection(point: Point): Node {
        if (this.isHitEnabled()) {
            return this.treeManager.intersection(point);
        }
    }

    isHitEnabled(): boolean {
        return this.hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this.hitEnabled = value;
    }
}

export default Layer;
