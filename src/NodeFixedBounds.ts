import {Bounds} from './Node';
import NodeLeaf from './NodeLeaf';

abstract class NodeFixedBounds<T> extends NodeLeaf<T> {
    private bounds: Bounds;

    constructor(bounds: Bounds) {
        super();
        this.bounds = bounds;
    }

    getBounds(): Bounds {
        return this.bounds;
    }
}

export default NodeFixedBounds;
