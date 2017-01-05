import {Bounds} from './Node';
import Layer from './Layer';

export default class LayerCached extends Layer {
    private caching: boolean = false;

    private cache: HTMLCanvasElement;

    private clipRegion?: Bounds;

    constructor({clipRegion}: {clipRegion?: Bounds} = {}) {
        super();
        this.clipRegion = clipRegion;
    }

    getBounds(): Bounds {
        if (this.clipRegion) {
            const {minX: clipMinX, minY: clipMinY, maxX: clipMaxX, maxY: clipMaxY} = this.clipRegion;
            const {minX, minY, maxX, maxY} = super.getBounds();
            return {
                minX: Math.max(minX, clipMinX),
                minY: Math.max(minY, clipMinY),
                maxX: Math.min(maxX, clipMaxX),
                maxY: Math.min(maxY, clipMaxY)
            };
        } else {
            return super.getBounds();
        }
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

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void {
        const {minX, minY, maxX, maxY} = this.getBounds();
        const width = maxX - minX;
        const height = maxY - minY;

        if (width > 0 && height > 0) {
            if (!this.cache) {
                this.cache = document.createElement('canvas');
                this.cache.width = width;
                this.cache.height = height;
                const cacheContext = this.cache.getContext('2d');
                const cacheStepAccumulator: Array<() => void> = [];
                const cacheCommitAccumulator: Array<() => void> = [];
                super.drawDeferred(cacheContext, cacheStepAccumulator, cacheCommitAccumulator);

                stepAccumulator.push(() => cacheContext.translate(-minX, -minY));
                for (const cacheStep of cacheStepAccumulator) {
                    stepAccumulator.push(cacheStep);
                }
                for (const cacheCommit of cacheCommitAccumulator) {
                    stepAccumulator.push(cacheCommit);
                }
                stepAccumulator.push(() => cacheContext.translate(minX, minY));
            }

            commitAccumulator.push(() => {
                context.drawImage(this.cache, minX, minY, width, height);
            });
        }
    }
};
