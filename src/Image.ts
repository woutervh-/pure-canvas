import Node, {Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

export interface ImageParameters {
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}

class Image extends NodeFixedBounds {
    private width: number;
    private height: number;
    private image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    private pixelArray: Uint8ClampedArray;

    constructor({width, height, image}: ImageParameters) {
        super({minX: 0, minY: 0, maxX: width, maxY: height});
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(context: CanvasRenderingContext2D): void {
        const {width, height, image} = this;
        try {
            context.drawImage(image, 0, 0, width, height);
        } catch (invalidStateError) {
            // Silently ignore
        }
    }

    intersection({x, y}: Point): Node {
        const {width, height, image} = this;
        const rx = Math.round(x);
        const ry = Math.round(y);

        if (0 <= rx && rx <= width && 0 <= ry && ry <= height) {
            if (!this.pixelArray) {
                const hitCanvas: HTMLCanvasElement = document.createElement('canvas');
                hitCanvas.width = width;
                hitCanvas.height = height;
                const hitContext: CanvasRenderingContext2D = hitCanvas.getContext('2d');
                hitContext.drawImage(image, 0, 0, width, height);
                this.pixelArray = hitContext.getImageData(0, 0, width, height).data;
            }

            if (this.pixelArray[(rx + ry * width) * 4 + 3] >= 1) {
                return this;
            }
        }
    }
}

export default Image;
