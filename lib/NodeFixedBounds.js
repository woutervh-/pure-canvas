"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeLeaf_1 = require("./NodeLeaf");
class NodeFixedBounds extends NodeLeaf_1.default {
    constructor(bounds) {
        super();
        this.bounds = bounds;
    }
    getBounds() {
        return this.bounds;
    }
}
exports.default = NodeFixedBounds;
//# sourceMappingURL=NodeFixedBounds.js.map