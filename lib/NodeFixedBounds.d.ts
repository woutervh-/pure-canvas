import { Bounds } from './Node';
import NodeLeaf from './NodeLeaf';
declare abstract class NodeFixedBounds<T> extends NodeLeaf<T> {
    private bounds;
    constructor(bounds: Bounds);
    getBounds(): Bounds;
}
export default NodeFixedBounds;
