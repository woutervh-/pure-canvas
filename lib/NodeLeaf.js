"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeBasic_1 = require("./NodeBasic");
const emptyTransformers = [];
class NodeLeaf extends NodeBasic_1.default {
    constructor() {
        super(...arguments);
        this.hitEnabled = false;
    }
    drawDeferred(stepAccumulator, commitAccumulator) {
        commitAccumulator.push((context) => this.draw(context));
    }
    index(action, zIndex) {
        action(this, zIndex, emptyTransformers);
        return zIndex;
    }
    isHitEnabled() {
        return this.hitEnabled;
    }
    setHitEnabled(value) {
        this.hitEnabled = value;
    }
}
exports.default = NodeLeaf;
//# sourceMappingURL=NodeLeaf.js.map