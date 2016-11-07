import Node from './Node';

interface NodeCollection {
    add(node: Node): number;

    remove(a: number | Node): void;

    removeAll(): void;

    count(): number;
}

export default NodeCollection;
