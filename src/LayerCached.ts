import Node, {Bounds, Point} from './Node';
import Transformer from './Transformer';
import TreeManager from './TreeManager';
import NodeIndexable from './NodeIndexable';
import Layer from './Layer';

const emptyTransformers: Array<Transformer> = [];

export default class LayerCached extends Layer {
    private caching: boolean = false;

    private indexing: boolean = false;

    private cache: HTMLCanvasElement;

    private clipRegion?: Bounds;

    private cachedBounds?: Bounds;

    private treeManager: TreeManager;

    constructor({clipRegion}: {clipRegion?: Bounds} = {}) {
        super();
        this.clipRegion = clipRegion;
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

    steps(): (context?: CanvasRenderingContext2D) => boolean {
        const {minX, minY, maxX, maxY} = this.getBounds();
        const width = maxX - minX;
        const height = maxY - minY;
        console.log(minX, minY, maxX, maxY)

        if (this.cache) {
            return (context) => {
                if (context) {
                    context.drawImage(this.cache, minX, minY, width, height);
                }
                return true;
            };
        } else {
            this.cache = document.createElement('canvas');
            this.cache.width = width;
            this.cache.height = height;
            const cacheContext = this.cache.getContext('2d');

            let next: (context?: CanvasRenderingContext2D) => boolean;
            let index: number = 0;
            return (context) => {
                if (context) {
                    context.drawImage(this.cache, minX, minY, width, height);
                } else {
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
                        if (index === this.children.length) {
                            cacheContext.translate(minX, minY);
                        }
                    }
                }
                return !next && index >= this.children.length;
            };
        }
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): number {
        if (this.indexing) {
            for (const child of this.children) {
                if (child.isHitEnabled()) {
                    zIndex = child.index(action, zIndex) + 1;
                }
            }
            return zIndex;
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

    setClipRegion(clipRegion: Bounds): void {
        this.invalidateBounds();
        this.invalidateBuffer();
        this.clipRegion = clipRegion;
    }
};
