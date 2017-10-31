import Node, { Point, Bounds } from './Node';
import NodeBase from './NodeBase';
import Transformer from './Transformer';
declare abstract class NodeLeaf extends NodeBase {
    private hitEnabled;
    abstract getBounds(): Bounds;
    abstract draw(context: CanvasRenderingContext2D): void;
    abstract intersection(point: Point): Node | undefined;
    constructor();
    private generator;
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    isHitEnabled(): boolean;
    setHitEnabled(value: boolean): void;
    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
}
export default NodeLeaf;
