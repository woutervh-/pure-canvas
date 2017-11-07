import Node, {Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

class Empty<T> extends NodeFixedBounds<T> {
    constructor() {
        super({minX: 0, minY: 0, maxX: 0, maxY: 0});
    }

    draw(context: CanvasRenderingContext2D): void {
    }

    intersection({x, y}: Point): Empty<T> | undefined {
        return undefined;
    }
}

export default Empty;
