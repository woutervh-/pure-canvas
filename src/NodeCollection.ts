import NodeIndexable from './NodeIndexable';
import Transformer from './Transformer';

interface NodeCollection {
    add(node: NodeIndexable, transformer?: Transformer): number;

    remove(a: number | NodeIndexable): void;

    removeAll(): void;

    count(): number;
}

export default NodeCollection;
