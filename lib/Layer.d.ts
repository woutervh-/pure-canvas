import Node, { Point, Bounds } from './Node';
import NodeIndexable from './NodeIndexable';
import NodeBase from './NodeBase';
import Transformer from './Transformer';
declare class Layer<T> extends NodeBase<T> {
    private hitEnabled;
    protected children: Iterable<NodeIndexable<T>>;
    constructor(children?: Iterable<NodeIndexable<T>>);
    setChildren(children: Iterable<NodeIndexable<T>>): void;
    draw(context: CanvasRenderingContext2D): void;
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    getBounds(): Bounds;
    intersection(point: Point): Node<T> | undefined;
    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
    isHitEnabled(): boolean;
    setHitEnabled(value: boolean): void;
}
export default Layer;
