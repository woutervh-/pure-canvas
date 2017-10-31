import Transformer from './Transformer';
import Node, { Point } from './Node';
export default class TreeManager {
    private tree;
    clear(): void;
    index(node: Node, zIndex: number, transformers: Array<Transformer>): void;
    intersection(point: Point): Node | undefined;
}
