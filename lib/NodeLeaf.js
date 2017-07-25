"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeBase_1 = require("./NodeBase");
class NodeLeaf extends NodeBase_1.default {
    constructor() {
        super();
        this.hitEnabled = false;
        this.generator = (context) => {
            if (context) {
                this.draw(context);
            }
            return true;
        };
    }
    steps() {
        return this.generator;
    }
    isHitEnabled() {
        return this.hitEnabled;
    }
    setHitEnabled(value) {
        this.hitEnabled = value;
    }
    index(action, zIndex, transformers) {
        action(this, zIndex, transformers);
        return zIndex;
    }
}
exports.default = NodeLeaf;
//# sourceMappingURL=NodeLeaf.js.map