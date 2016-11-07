import rbush from 'rbush';
import Node, {Point, Bounds} from './Node';
import NodeCollection from './NodeCollection';
import NodeImageable from './NodeImageable';

export default class Layer extends NodeImageable implements NodeCollection {
    private children: Array<Node> = [];

    draw(context: CanvasRenderingContext2D): void {
        for (const child of this.children) {
            child.draw(context);
        }
    }

    getBounds(): Bounds {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (const child of this.children) {
            const {x, y, width, height} = child.getBounds();
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x + width);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y + height);
        }

        return {x: minX, y: minY, width: maxX - minX, height: maxY - minY};
    }

    intersection(point: Point): Node {
        // TODO: use rbush to speed things up
        // Visit children in reverse order: the ones drawn the last are checked the first
        for (const child of this.children.slice().reverse()) {
            const intersection = child.intersection(point);
            if (!!intersection) {
                return intersection;
            }
        }
    }

    add(node: Node): number {
        this.children.push(node);
        return this.children.length - 1;
    }

    remove(a: number | Node): void {
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
};
