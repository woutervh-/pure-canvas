import Node, {Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';
import {getSafeContext} from './util';

export interface ImageParameters {
    x?: number;
    y?: number;
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}

class Image<T> extends NodeFixedBounds<T> {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    private pixelArray: Uint8ClampedArray;

    constructor({x = 0, y = 0, width, height, image}: ImageParameters) {
        super({minX: x, minY: y, maxX: x + width, maxY: y + height});
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {x, y, width, height, image} = this;
        try {
            context.drawImage(image, x, y, width, height);
        } catch (invalidStateError) {
            // Silently ignore
        }
    }

    intersection({x, y}: Point): Image<T> | undefined {
        const {x: ox, y: oy, width, height, image} = this;
        const rx = Math.round(x - ox);
        const ry = Math.round(y - oy);

        if (0 <= rx && rx <= width && 0 <= ry && ry <= height) {
            if (!this.pixelArray) {
                const hitCanvas: HTMLCanvasElement = document.createElement('canvas');
                hitCanvas.width = width;
                hitCanvas.height = height;
                const hitContext: CanvasRenderingContext2D = getSafeContext(hitCanvas);
                try {
                    hitContext.drawImage(image, 0, 0, width, height);
                } catch (invalidStateError) {
                    // Silently ignore
                }
                this.pixelArray = hitContext.getImageData(0, 0, width, height).data;
            }

            if (this.pixelArray[(rx + ry * width) * 4 + 3] >= 1) {
                return this;
            }
        }
    }
}

export default Image;
