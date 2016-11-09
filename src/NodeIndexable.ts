import Node from './Node';
import Transformer from './Transformer';

interface NodeIndexable extends Node {
    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void;
}

export default NodeIndexable;
