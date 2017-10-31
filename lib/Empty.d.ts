import Node, { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
declare class Empty extends NodeFixedBounds {
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    intersection({x, y}: Point): Node | undefined;
}
export default Empty;
