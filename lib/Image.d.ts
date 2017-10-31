import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface ImageParameters {
    x?: number;
    y?: number;
    width: number;
    height: number;
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}
declare class Image extends NodeFixedBounds {
    private x;
    private y;
    private width;
    private height;
    private image;
    private pixelArray;
    constructor({x, y, width, height, image}: ImageParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default Image;
