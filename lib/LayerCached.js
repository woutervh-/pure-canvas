"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const TreeManager_1 = require("./TreeManager");
const util_1 = require("./util");
class LayerCached extends Layer_1.default {
    constructor(options = {}) {
        super();
        this.caching = false;
        this.indexFinished = false;
        this.clipRegion = options.clipRegion;
    }
    getBounds() {
        if (!this.cachedBounds) {
            if (this.clipRegion) {
                // const {minX: clipMinX, minY: clipMinY, maxX: clipMaxX, maxY: clipMaxY} = this.clipRegion;
                // const {minX, minY, maxX, maxY} = super.getBounds();
                // this.cachedBounds = {
                //     minX: Math.max(minX, clipMinX),
                //     minY: Math.max(minY, clipMinY),
                //     maxX: Math.min(maxX, clipMaxX),
                //     maxY: Math.min(maxY, clipMaxY)
                // };
                this.cachedBounds = this.clipRegion;
            }
            else {
                this.cachedBounds = super.getBounds();
            }
        }
        return this.cachedBounds;
    }
    draw(context) {
        if (this.caching) {
            super.draw(context);
        }
        else {
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage();
                this.caching = false;
            }
            const { minX, minY, maxX, maxY } = this.getBounds();
            context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
        }
    }
    steps() {
        if (!this.generator) {
            const { minX, minY, maxX, maxY } = this.getBounds();
            const width = maxX - minX;
            const height = maxY - minY;
            const cache = document.createElement('canvas');
            cache.width = width;
            cache.height = height;
            const cacheContext = util_1.getSafeContext(cache);
            if (!this.indexFinished) {
                this.treeManager = new TreeManager_1.default();
            }
            const action = (node, zIndex, transformers) => {
                this.treeManager.index(node, zIndex, transformers);
            };
            const children = this.children[Symbol.iterator]();
            let zIndex = 0;
            let nextChild = null;
            let next = null;
            let first = true;
            let last = false;
            this.generator = (context) => {
                if (this.cache) {
                    if (context) {
                        context.drawImage(this.cache, minX, minY, width, height);
                    }
                    return true;
                }
                else {
                    if (context) {
                        context.drawImage(cache, minX, minY, width, height);
                    }
                    else {
                        if (!next) {
                            if (first) {
                                cacheContext.translate(-minX, -minY);
                                first = false;
                            }
                            nextChild = children.next();
                            if (!nextChild.done) {
                                next = nextChild.value.steps();
                            }
                            else {
                                cacheContext.translate(minX, minY);
                                this.cache = cache;
                                this.indexFinished = true;
                                last = true;
                            }
                        }
                        if (next && nextChild && next()) {
                            next(cacheContext);
                            if (!this.indexFinished) {
                                if (nextChild.value.isHitEnabled()) {
                                    zIndex = nextChild.value.index(action, zIndex, []) + 1;
                                }
                            }
                            next = null;
                            nextChild = null;
                        }
                    }
                    return !next && last;
                }
            };
        }
        return this.generator;
    }
    index(action, zIndex, transformers) {
        action(this, zIndex, transformers);
        return zIndex;
    }
    intersection(point) {
        if (!this.treeManager) {
            this.treeManager = new TreeManager_1.default();
            const action = (node, zIndex, transformers) => {
                this.treeManager.index(node, zIndex, transformers);
            };
            let zIndex = 0;
            for (const child of this.children) {
                if (child.isHitEnabled()) {
                    zIndex = child.index(action, zIndex, []) + 1;
                }
            }
            this.indexFinished = true;
        }
        return this.treeManager.intersection(point);
    }
}
exports.default = LayerCached;
;
//# sourceMappingURL=LayerCached.js.map