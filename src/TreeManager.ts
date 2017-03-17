import * as rbush from 'rbush';
import IndexedNode from './IndexedNode';
import Transformer from './Transformer';
import Node, {Point} from './Node';
import NodeIndexable from './NodeIndexable';

export default class TreeManager {
    private tree: rbush.RBush<IndexedNode> = rbush<IndexedNode>();

    private nodeIndexable: NodeIndexable;

    constructor(nodeIndexable: NodeIndexable) {
        this.nodeIndexable = nodeIndexable;
    }

    reindex() {
        this.tree.clear();
        this.nodeIndexable.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            const bounds = node.getBounds();
            const {x: x1, y: y1} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.minY});
            const {x: x2, y: y2} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.maxY});
            const {x: x3, y: y3} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.maxY});
            const {x: x4, y: y4} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.minY});
            const minX = Math.min(x1, x2, x3, x4);
            const minY = Math.min(y1, y2, y3, y4);
            const maxX = Math.max(x1, x2, x3, x4);
            const maxY = Math.max(y1, y2, y3, y4);
            this.tree.insert({
                minX, minY, maxX, maxY,
                transformers, node, zIndex
            });
        }, 0);
    }

    intersection(point: Point): Node {
        const results = this.tree
            .search({minX: point.x, minY: point.y, maxX: point.x, maxY: point.y})
            .sort((a: IndexedNode, b: IndexedNode) => b.zIndex - a.zIndex);
        for (const indexedNode of results) {
            const untransformedPoint = indexedNode.transformers.reduceRight((point: Point, transformer: Transformer) => transformer.untransform(point), point);
            const node = indexedNode.node.intersection(untransformedPoint);
            if (node) {
                return node;
            }
        }
    }
};
