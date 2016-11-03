import {Point} from './Node';
import BoundedNode from './BoundedNode';

export interface ImageParameters {
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}

class Image extends BoundedNode {
    private width: number;
    private height: number;
    private image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    private pixelArray: Uint8ClampedArray;

    constructor({width, height, image}: ImageParameters) {
        super({x: 0, y: 0, width, height});
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {width, height, image} = this;
        try {
            context.drawImage(image, 0, 0, width, height);
        } catch (InvalidStateError) {
            // Silently ignore
        }
    }

    intersects({x, y}: Point): boolean {
        const {width, height, image} = this;

        if (!this.pixelArray) {
            const hitCanvas: HTMLCanvasElement = document.createElement('canvas');
            hitCanvas.width = width;
            hitCanvas.height = height;
            const hitContext: CanvasRenderingContext2D = hitCanvas.getContext('2d');
            hitContext.drawImage(image, 0, 0, width, height);
            this.pixelArray = hitContext.getImageData(0, 0, width, height).data;
        }

        return this.pixelArray[(x + y * width) * 4 + 3] >= 1;
    }
}

export default Image;
