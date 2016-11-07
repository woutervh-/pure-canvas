import {Bounds} from './Node';
import NodeImageable from './NodeImageable';

abstract class NodeFixedBounds extends NodeImageable {
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
