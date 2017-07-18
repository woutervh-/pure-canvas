"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFixedBounds_1 = require("./NodeFixedBounds");
class Dummy extends NodeFixedBounds_1.default {
    constructor() {
        super({ minX: 0, minY: 0, maxX: 0, maxY: 0 });
    }
    draw(context) {
    }
    intersection({ x, y }) {
        return null;
    }
}
exports.default = Dummy;
//# sourceMappingURL=Dummy.js.map