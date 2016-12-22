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

    draw(context: CanvasRenderingContext2D): void {
        if (this.caching) {
            super.draw(context);
        } else {
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage(this.clipRegion);
                this.caching = false;
            }
            const {minX, minY, maxX, maxY} = this.clipRegion ? this.clipRegion : this.getBounds();
            context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
        }
    }

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void {
        const {minX, minY, maxX, maxY} = this.clipRegion ? this.clipRegion : this.getBounds();

        if (!this.cache) {
            const {minX: realMinX, minY: realMinY} = super.getBounds();
            this.cache = document.createElement('canvas');
            this.cache.width = maxX - minX;
            this.cache.height = maxY - minY;
            const cacheContext = this.cache.getContext('2d');
            const cacheStepAccumulator: Array<() => void> = [];
            const cacheCommitAccumulator: Array<() => void> = [];
            super.drawDeferred(cacheContext, cacheStepAccumulator, cacheCommitAccumulator);

            stepAccumulator.push(() => cacheContext.translate(-realMinX - minX, -realMinY - minY));
            for (const cacheStep of cacheStepAccumulator) {
                stepAccumulator.push(cacheStep);
            }
            for (const cacheCommit of cacheCommitAccumulator) {
                stepAccumulator.push(cacheCommit);
            }
            stepAccumulator.push(() => cacheContext.translate(realMinX + minX, realMinY + minY));
        }

        commitAccumulator.push(() => {
            context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
        });
    }
};
