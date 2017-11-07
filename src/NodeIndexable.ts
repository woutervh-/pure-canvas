import Node from './Node';
import Transformer from './Transformer';

interface NodeIndexable<T> extends Node<T> {
    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
}

export default NodeIndexable;
