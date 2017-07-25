"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
class TransformerBase extends Layer_1.default {
    constructor() {
        super();
    }
    draw(context) {
        this.preDraw(context);
        super.draw(context);
        this.postDraw(context);
    }
    steps() {
        const next = super.steps();
        return (context) => {
            if (context) {
                this.preDraw(context);
                const result = next(context);
                this.postDraw(context);
                return result;
            }
            else {
                return next();
            }
        };
    }
    index(action, zIndex, transformers) {
        return super.index(action, zIndex, [...transformers, this]);
    }
}
exports.default = TransformerBase;
//# sourceMappingURL=TransformerBase.js.map