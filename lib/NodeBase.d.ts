import Node, { Bounds, Point } from './Node';
import NodeIndexable from './NodeIndexable';
import Transformer from './Transformer';
declare abstract class NodeBase<T> implements NodeIndexable<T> {
    abstract getBounds(): Bounds;
    abstract draw(context: CanvasRenderingContext2D): void;
    abstract steps(): (context?: CanvasRenderingContext2D) => boolean;
    abstract intersection(point: Point): Node<T> | undefined;
    toImage(): HTMLCanvasElement;
    abstract index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
    abstract isHitEnabled(): boolean;
    abstract setHitEnabled(value: boolean): void;
}
export default NodeBase;
