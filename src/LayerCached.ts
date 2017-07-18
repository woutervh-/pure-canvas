import Node, {Bounds, Point} from './Node';
import Layer from './Layer';
import Transformer from './Transformer';
import TreeManager from './TreeManager';
import NodeIndexable from './NodeIndexable';

const emptyTransformers: Array<Transformer> = [];

export default class LayerCached extends Layer {
    private caching: boolean = false;

    private indexing: boolean = false;

    private cache: HTMLCanvasElement;

    private clipRegion?: Bounds;

    private batchSize: number;

    private cachedBounds?: Bounds;

    private treeManager: TreeManager;

    constructor({clipRegion, batchSize = 128}: {clipRegion?: Bounds, batchSize?: number} = {}) {
        super();
        this.clipRegion = clipRegion;
        this.batchSize = batchSize;
    }

    invalidateAll(): void {
        this.invalidateBuffer();
        this.invalidateIndex();
        this.invalidateBounds();
    }

    invalidateBuffer(): void {
        this.cache = undefined;
    }

    invalidateIndex(): void {
        this.treeManager = undefined;
    }

    invalidateBounds(): void {
        this.cachedBounds = undefined;
    }

    getBounds(): Bounds {
        if (!this.cachedBounds) {
            if (this.clipRegion) {
                const {minX: clipMinX, minY: clipMinY, maxX: clipMaxX, maxY: clipMaxY} = this.clipRegion;
                const {minX, minY, maxX, maxY} = super.getBounds();
                this.cachedBounds = {
                    minX: Math.max(minX, clipMinX),
                    minY: Math.max(minY, clipMinY),
                    maxX: Math.min(maxX, clipMaxX),
                    maxY: Math.min(maxY, clipMaxY)
                };
            } else {
                this.cachedBounds = super.getBounds();
            }
        }
        return this.cachedBounds;
    }

    draw(context: CanvasRenderingContext2D): void {
        if (this.caching) {
            super.draw(context);
        } else {
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage();
                this.caching = false;
            }
            const {minX, minY, maxX, maxY} = this.getBounds();
            context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
        }
    }

    drawDeferred(stepAccumulator: Array<() => void>, commitAccumulator: Array<(context: CanvasRenderingContext2D) => void>): void {
        const {minX, minY, maxX, maxY} = this.getBounds();
        const width = maxX - minX;
        const height = maxY - minY;

        if (Math.floor(width) > 0 && Math.floor(height) > 0) {
            if (!this.cache) {
                this.cache = document.createElement('canvas');
                this.cache.width = width;
                this.cache.height = height;
                const cacheContext = this.cache.getContext('2d');
                const cacheStepAccumulator: Array<() => void> = [];
                const cacheCommitAccumulator: Array<(content: CanvasRenderingContext2D) => void> = [];
                super.drawDeferred(cacheStepAccumulator, cacheCommitAccumulator);

                stepAccumulator.push(() => cacheContext.translate(-minX, -minY));
                for (let i = 0; i < cacheStepAccumulator.length + cacheCommitAccumulator.length; i += this.batchSize) {
                    const start = i;
                    const end = Math.min(cacheStepAccumulator.length + cacheCommitAccumulator.length, start + this.batchSize);
                    stepAccumulator.push(() => {
                        for (let i = start; i < end; i++) {
                            if (i < cacheStepAccumulator.length) {
                                cacheStepAccumulator[i]();
                            } else {
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

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): number {
        if (this.indexing) {
            return super.index(action, zIndex);
        } else {
            action(this, zIndex, emptyTransformers);
            return zIndex;
        }
    }

    intersection(point: Point): Node {
        if (!this.treeManager) {
            this.indexing = true;
            this.treeManager = new TreeManager(this);
            this.treeManager.reindex();
            this.indexing = false;
        }

        return this.treeManager.intersection(point);
    }

    add(node: NodeIndexable): number {
        this.invalidateAll();
        return super.add(node);
    }

    remove(a: number | NodeIndexable): void {
        this.invalidateAll();
        super.remove(a);
    }

    removeAll(): void {
        this.invalidateAll();
        super.removeAll();
    }

    setClipRegion(clipRegion: Bounds): void {
        this.invalidateBounds();
        this.invalidateBuffer();
        this.clipRegion = clipRegion;
    }
};
