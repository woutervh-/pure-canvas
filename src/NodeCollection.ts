import Node from './Node';
import Transformer from './Transformer';

interface NodeCollection {
    add(node: Node, transformer?: Transformer): number;

    remove(a: number | Node): void;

    removeAll(): void;

    count(): number;
}

export default NodeCollection;
