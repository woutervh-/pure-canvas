import * as rbush from 'rbush';
import Transformer from './Transformer';
import Node from './Node';

interface IndexedNode extends rbush.BBox {
    transformer?: Transformer;
    node: Node;
    zIndex: number;
}

export default IndexedNode;
