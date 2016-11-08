import Layer from './Layer';

export default class LayerCached extends Layer {
    private caching: boolean = false;

    private cache: HTMLCanvasElement;

    draw(context: CanvasRenderingContext2D): void {
        if (this.caching) {
            super.draw(context);
        } else {
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage();
                this.caching = false;
            }
            context.drawImage(this.cache, 0, 0, this.cache.width, this.cache.height);
        }
    }
};
