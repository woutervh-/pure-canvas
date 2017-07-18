"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
class Transformer extends Layer_1.default {
    constructor() {
        super();
    }
    draw(context) {
        this.preDraw(context);
        super.draw(context);
        this.postDraw(context);
    }
    drawDeferred(stepAccumulator, commitAccumulator) {
        commitAccumulator.push((context) => this.preDraw(context));
        super.drawDeferred(stepAccumulator, commitAccumulator);
        commitAccumulator.push((context) => this.postDraw(context));
    }
    index(action, zIndex) {
        return super.index((node, zIndex, transformers) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
    }
}
exports.default = Transformer;
//# sourceMappingURL=Transformer.js.map