"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rbush = require("rbush");
class TreeManager {
    constructor() {
        this.tree = rbush();
    }
    clear() {
        this.tree.clear();
    }
    index(node, zIndex, transformers) {
        const bounds = node.getBounds();
        if (Number.isFinite(bounds.minX) && Number.isFinite(bounds.minY) && Number.isFinite(bounds.maxX) && Number.isFinite(bounds.maxY)) {
            let minX, minY, maxX, maxY;
            const { x: x1, y: y1 } = transformers.reduce((point, transformer) => transformer.transform(point), { x: bounds.minX, y: bounds.minY });
            const { x: x2, y: y2 } = transformers.reduce((point, transformer) => transformer.transform(point), { x: bounds.maxX, y: bounds.maxY });
            const { x: x3, y: y3 } = transformers.reduce((point, transformer) => transformer.transform(point), { x: bounds.minX, y: bounds.maxY });
            const { x: x4, y: y4 } = transformers.reduce((point, transformer) => transformer.transform(point), { x: bounds.maxX, y: bounds.minY });
            minX = Math.min(x1, x2, x3, x4);
            minY = Math.min(y1, y2, y3, y4);
            maxX = Math.max(x1, x2, x3, x4);
            maxY = Math.max(y1, y2, y3, y4);
            const indexedNode = { minX, minY, maxX, maxY, transformers, node, zIndex };
            this.tree.insert(indexedNode);
        }
    }
    intersection(point) {
        const results = this.tree
            .search({ minX: point.x, minY: point.y, maxX: point.x, maxY: point.y })
            .sort((a, b) => b.zIndex - a.zIndex);
        for (const indexedNode of results) {
            const untransformedPoint = indexedNode.transformers.reduceRight((point, transformer) => transformer.untransform(point), point);
            const node = indexedNode.node.intersection(untransformedPoint);
            if (node) {
                return node;
            }
        }
    }
}
exports.default = TreeManager;
;
//# sourceMappingURL=TreeManager.js.map