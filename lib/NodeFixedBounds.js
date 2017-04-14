"use strict";
const NodeLeaf_1 = require('./NodeLeaf');
class NodeFixedBounds extends NodeLeaf_1.default {
    constructor(bounds) {
        super();
        this.bounds = bounds;
    }
    getBounds() {
        return this.bounds;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeFixedBounds;
//# sourceMappingURL=NodeFixedBounds.js.map