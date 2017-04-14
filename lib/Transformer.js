"use strict";
const Layer_1 = require('./Layer');
class Transformer extends Layer_1.default {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Transformer;
//# sourceMappingURL=Transformer.js.map