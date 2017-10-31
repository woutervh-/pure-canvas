import { Bounds } from './Node';
import NodeLeaf from './NodeLeaf';
declare abstract class NodeFixedBounds extends NodeLeaf {
    private bounds;
    constructor(bounds: Bounds);
    getBounds(): Bounds;
}
export default NodeFixedBounds;
