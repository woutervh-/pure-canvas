import * as rbush from 'rbush';
import Transformer from './Transformer';
import Node from './Node';

interface IndexedNode<T> extends rbush.BBox {
    transformers: Array<Transformer>;
    node: Node<T>;
    zIndex: number;
}

export default IndexedNode;
