import Node from './Node';
import Transformer from './Transformer';

interface NodeCollection {
    add(node: Node, transformer?: Transformer): number;

    addAll(nodes: Iterator<Node>, transformer?: Transformer): Promise<void>;

    remove(a: number | Node): void;

    removeAll(): void;

    count(): number;
}

export default NodeCollection;
