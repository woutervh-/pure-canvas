import Node, {Point} from './Node';
import NodeFixedBounds from './NodeFixedBounds';

class Empty extends NodeFixedBounds {
    constructor() {
        super({minX: 0, minY: 0, maxX: 0, maxY: 0});
    }

    draw(context: CanvasRenderingContext2D): void {
    }

    intersection({x, y}: Point): Node | undefined {
        return undefined;
    }
}

export default Empty;
