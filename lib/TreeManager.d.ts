import Transformer from './Transformer';
import Node, { Point } from './Node';
export default class TreeManager<T> {
    private tree;
    clear(): void;
    index(node: Node<T>, zIndex: number, transformers: Array<Transformer>): void;
    intersection(point: Point): Node<T> | undefined;
}
