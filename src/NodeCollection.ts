import NodeIndexable from './NodeIndexable';

interface NodeCollection {
    add(node: NodeIndexable): number;

    remove(a: number | NodeIndexable): void;

    removeAll(): void;

    count(): number;
}

export default NodeCollection;
