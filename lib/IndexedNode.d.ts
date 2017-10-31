import Transformer from './Transformer';
import Node from './Node';
interface IndexedNode extends rbush.BBox {
    transformers: Array<Transformer>;
    node: Node;
    zIndex: number;
}
export default IndexedNode;
