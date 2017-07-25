"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeBase_1 = require("./NodeBase");
class Layer extends NodeBase_1.default {
    constructor(children = []) {
        super();
        this.hitEnabled = true;
        this.children = children;
    }
    setChildren(children) {
        this.children = children;
    }
    draw(context) {
        for (const child of this.children) {
            child.draw(context);
        }
    }
    steps() {
        const generators = Array.from(this.children).map((child) => child.steps());
        let index = 0;
        return (context) => {
            if (context) {
                for (const generator of generators) {
                    generator(context);
                }
            }
            else {
                if (index < generators.length) {
                    if (generators[index]()) {
                        index += 1;
                    }
                }
            }
            return index >= generators.length;
        };
    }
    getBounds() {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        for (const child of this.children) {
            const { minX: childMinX, minY: childMinY, maxX: childMaxX, maxY: childMaxY } = child.getBounds();
            minX = Math.min(minX, childMinX);
            minY = Math.min(minY, childMinY);
            maxX = Math.max(maxX, childMaxX);
            maxY = Math.max(maxY, childMaxY);
        }
        return { minX, minY, maxX, maxY };
    }
    intersection(point) {
        // Visit children in reverse order: the ones drawn last must be checked first
        for (const child of Array.from(this.children).reverse()) {
            if (child.isHitEnabled()) {
                const intersection = child.intersection(point);
                if (!!intersection) {
                    return intersection;
                }
            }
        }
    }
    index(action, zIndex, transformers) {
        for (const child of this.children) {
            if (child.isHitEnabled()) {
                zIndex = child.index(action, zIndex, transformers) + 1;
            }
        }
        return zIndex;
    }
    isHitEnabled() {
        return this.hitEnabled;
    }
    setHitEnabled(value) {
        this.hitEnabled = value;
    }
}
exports.default = Layer;
//# sourceMappingURL=Layer.js.map