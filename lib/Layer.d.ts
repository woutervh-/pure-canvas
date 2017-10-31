import Node, { Point, Bounds } from './Node';
import NodeIndexable from './NodeIndexable';
import NodeBase from './NodeBase';
import Transformer from './Transformer';
declare class Layer extends NodeBase {
    private hitEnabled;
    protected children: Iterable<NodeIndexable>;
    constructor(children?: Iterable<NodeIndexable>);
    setChildren(children: Iterable<NodeIndexable>): void;
    draw(context: CanvasRenderingContext2D): void;
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    getBounds(): Bounds;
    intersection(point: Point): Node | undefined;
    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
    isHitEnabled(): boolean;
    setHitEnabled(value: boolean): void;
}
export default Layer;
