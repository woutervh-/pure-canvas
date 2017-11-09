import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface ImageStyle {
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}
export interface ImageParameters extends ImageStyle {
    x?: number;
    y?: number;
}
declare class Image<T> extends NodeFixedBounds<T> {
    private x;
    private y;
    private width;
    private height;
    private image;
    private pixelArray;
    constructor({x, y, width, height, image}: ImageParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Image<T> | undefined;
}
export default Image;
