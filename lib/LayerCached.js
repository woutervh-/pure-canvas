"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const TreeManager_1 = require("./TreeManager");
class LayerCached extends Layer_1.default {
    constructor({ clipRegion } = {}) {
        super();
        this.caching = false;
        this.indexFinished = false;
        this.clipRegion = clipRegion;
    }
    invalidateAll() {
        this.invalidateBuffer();
        this.invalidateBounds();
        this.invalidateIndex();
    }
    invalidateBuffer() {
        this.cache = undefined;
        this.generator = undefined;
    }
    invalidateIndex() {
        this.treeManager = undefined;
        this.indexFinished = false;
    }
    invalidateBounds() {
        this.cachedBounds = undefined;
    }
    getBounds() {
        if (!this.cachedBounds) {
            if (this.clipRegion) {
                const { minX: clipMinX, minY: clipMinY, maxX: clipMaxX, maxY: clipMaxY } = this.clipRegion;
                const { minX, minY, maxX, maxY } = super.getBounds();
                this.cachedBounds = {
                    minX: Math.max(minX, clipMinX),
                    minY: Math.max(minY, clipMinY),
                    maxX: Math.min(maxX, clipMaxX),
                    maxY: Math.min(maxY, clipMaxY)
                };
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
            const cacheContext = cache.getContext('2d');
            if (!this.indexFinished) {
                this.treeManager = new TreeManager_1.default();
            }
            const action = (node, zIndex, transformers) => {
                this.treeManager.index(node, zIndex, transformers);
            };
            let zIndex = 0;
            let next;
            let index = 0;
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
                            if (index === 0) {
                                cacheContext.translate(-minX, -minY);
                            }
                            if (index < this.children.length) {
                                next = this.children[index++].steps();
                            }
                        }
                        if (next && next()) {
                            next(cacheContext);
                            next = null;
                            if (!this.indexFinished) {
                                const child = this.children[index - 1];
                                if (child.isHitEnabled()) {
                                    zIndex = child.index(action, zIndex, []) + 1;
                                }
                            }
                            if (index === this.children.length) {
                                cacheContext.translate(minX, minY);
                                this.cache = cache;
                                this.indexFinished = true;
                            }
                        }
                    }
                    return !next && index >= this.children.length;
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
        if (!this.indexFinished) {
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
    add(node) {
        this.invalidateAll();
        return super.add(node);
    }
    remove(a) {
        this.invalidateAll();
        super.remove(a);
    }
    removeAll() {
        this.invalidateAll();
        super.removeAll();
    }
    setClipRegion(clipRegion) {
        this.invalidateBounds();
        this.invalidateBuffer();
        this.clipRegion = clipRegion;
    }
}
exports.default = LayerCached;
;
//# sourceMappingURL=LayerCached.js.map