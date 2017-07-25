"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
class Empty extends NodeFixedBounds_1.default {
    constructor() {
        super({ minX: 0, minY: 0, maxX: 0, maxY: 0 });
    }
    draw(context) {
    }
    intersection({ x, y }) {
        return null;
    }
}
exports.default = Empty;
//# sourceMappingURL=Empty.js.map