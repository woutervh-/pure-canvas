import {Bounds} from './Node';
import NodeLeaf from './NodeLeaf';

abstract class NodeFixedBounds extends NodeLeaf {
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
