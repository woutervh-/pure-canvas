"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const TreeManager_1 = require("./TreeManager");
const emptyTransformers = [];
class LayerCached extends Layer_1.default {
    constructor({ clipRegion, batchSize = 128 } = {}) {
        super();
        this.caching = false;
        this.indexing = false;
        this.clipRegion = clipRegion;
        this.batchSize = batchSize;
    }
    invalidateAll() {
        this.invalidateBuffer();
        this.invalidateIndex();
        this.invalidateBounds();
    }
    invalidateBuffer() {
        this.cache = undefined;
    }
    invalidateIndex() {
        this.treeManager = undefined;
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
    drawDeferred(stepAccumulator, commitAccumulator) {
        const { minX, minY, maxX, maxY } = this.getBounds();
        const width = maxX - minX;
        const height = maxY - minY;
        if (Math.floor(width) > 0 && Math.floor(height) > 0) {
            if (!this.cache) {
                this.cache = document.createElement('canvas');
                this.cache.width = width;
                this.cache.height = height;
                const cacheContext = this.cache.getContext('2d');
                const cacheStepAccumulator = [];
                const cacheCommitAccumulator = [];
                super.drawDeferred(cacheStepAccumulator, cacheCommitAccumulator);
                stepAccumulator.push(() => cacheContext.translate(-minX, -minY));
                for (let i = 0; i < cacheStepAccumulator.length + cacheCommitAccumulator.length; i += this.batchSize) {
                    const start = i;
                    const end = Math.min(cacheStepAccumulator.length + cacheCommitAccumulator.length, start + this.batchSize);
                    stepAccumulator.push(() => {
                        for (let i = start; i < end; i++) {
                            if (i < cacheStepAccumulator.length) {
                                cacheStepAccumulator[i]();
                            }
                            else {
                                cacheCommitAccumulator[i - cacheStepAccumulator.length](cacheContext);
                            }
                        }
                    });
                }
                stepAccumulator.push(() => cacheContext.translate(minX, minY));
            }
            commitAccumulator.push((context) => {
                context.drawImage(this.cache, minX, minY, width, height);
            });
        }
    }
    index(action, zIndex) {
        if (this.indexing) {
            return super.index(action, zIndex);
        }
        else {
            action(this, zIndex, emptyTransformers);
            return zIndex;
        }
    }
    intersection(point) {
        if (!this.treeManager) {
            this.indexing = true;
            this.treeManager = new TreeManager_1.default(this);
            this.treeManager.reindex();
            this.indexing = false;
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