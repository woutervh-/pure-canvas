import {Bounds} from './Node';
import Layer from './Layer';

export default class LayerCached extends Layer {
    private caching: boolean = false;

    private cache: HTMLCanvasElement;

    private clipRegion?: Bounds;

    private cachedBounds?: Bounds;

    private generator: (context?: CanvasRenderingContext2D) => boolean;

    constructor({clipRegion}: {clipRegion?: Bounds} = {}) {
        super();
        this.clipRegion = clipRegion;
    }

    invalidateAll(): void {
        this.invalidateBuffer();
        this.invalidateBounds();
    }

    invalidateBuffer(): void {
        this.cache = undefined;
        this.generator = undefined;
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
        if (!this.generator) {
            const {minX, minY, maxX, maxY} = this.getBounds();
            const width = maxX - minX;
            const height = maxY - minY;
            const cache = document.createElement('canvas');
            cache.width = width;
            cache.height = height;
            const cacheContext = cache.getContext('2d');

            let next: (context?: CanvasRenderingContext2D) => boolean;
            let index: number = 0;
            this.generator = (context) => {
                if (this.cache) {
                    if (context) {
                        context.drawImage(cache, minX, minY, width, height);
                    }
                    return true;
                } else {
                    if (context) {
                        context.drawImage(cache, minX, minY, width, height);
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
                                this.cache = cache;
                            }
                        }
                    }
                    return !next && index >= this.children.length;
                }
            };
        }
        return this.generator;
    }

    setClipRegion(clipRegion: Bounds): void {
        this.invalidateBounds();
        this.invalidateBuffer();
        this.clipRegion = clipRegion;
    }
};
