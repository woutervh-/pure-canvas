import * as rbush from 'rbush';
import IndexedNode from './IndexedNode';
import Transformer from './Transformer';
import Node, {Point} from './Node';

export default class TreeManager {
    private tree: rbush.RBush<IndexedNode> = rbush<IndexedNode>();

    clear() {
        this.tree.clear();
    }

    index(node: Node, zIndex: number, transformers: Array<Transformer>) {
        const bounds = node.getBounds();
        if (Number.isFinite(bounds.minX) && Number.isFinite(bounds.minY) && Number.isFinite(bounds.maxX) && Number.isFinite(bounds.maxY)) {
            let minX: number, minY: number, maxX: number, maxY: number;
            const {x: x1, y: y1} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.minY});
            const {x: x2, y: y2} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.maxY});
            const {x: x3, y: y3} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.maxY});
            const {x: x4, y: y4} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.minY});
            minX = Math.min(x1, x2, x3, x4);
            minY = Math.min(y1, y2, y3, y4);
            maxX = Math.max(x1, x2, x3, x4);
            maxY = Math.max(y1, y2, y3, y4);
            const indexedNode = {minX, minY, maxX, maxY, transformers, node, zIndex};
            this.tree.insert(indexedNode);
        }
    }

    intersection(point: Point): Node | undefined {
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
