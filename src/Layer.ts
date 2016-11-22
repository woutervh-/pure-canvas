import Node, {Point, Bounds} from './Node';
import NodeIndexable from './NodeIndexable';
import NodeCollection from './NodeCollection';
import NodeBasic from './NodeBasic';
import Transformer from './Transformer';

class Layer extends NodeBasic implements NodeCollection {
    private hitEnabled: boolean = true;

    private children: Array<NodeIndexable> = [];

    draw(context: CanvasRenderingContext2D): void {
        for (const child of this.children) {
            child.draw(context);
        }
    }

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void {
        for (const child of this.children) {
            child.drawDeferred(context, stepAccumulator, commitAccumulator);
        }
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

    add(node: NodeIndexable): number {
        this.children.push(node);
        return this.children.length - 1;
    }

    remove(a: number | NodeIndexable): void {
        if (typeof a === 'number') {
            this.children.splice(a, 1);
        } else {
            this.remove(this.children.indexOf(a));
        }
    }

    removeAll(): void {
        this.children = [];
    }

    count(): number {
        return this.children.length;
    }

    intersection(point: Point): Node {
        // Visit children in reverse order: the ones drawn last must be checked first
        for (const child of this.children.slice().reverse()) {
            if (child.isHitEnabled()) {
                const intersection = child.intersection(point);
                if (!!intersection) {
                    return intersection;
                }
            }
        }
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        for (const child of this.children) {
            if (child.isHitEnabled()) {
                child.index(action, zIndex++);
            }
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
