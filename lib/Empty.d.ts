import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
declare class Empty<T> extends NodeFixedBounds<T> {
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Empty<T> | undefined;
}
export default Empty;
