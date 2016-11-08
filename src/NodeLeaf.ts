import Node, {Point, Bounds} from './Node';
import NodeBasic from './NodeBasic';
import * as rbush from 'rbush';

const origin = {x: 0, y: 0};

abstract class NodeLeaf extends NodeBasic {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    index(action: (node: Node, origin: Point, bbox: rbush.BBox) => void): void {
        const {x, y, width, height} = this.getBounds();
        action(this, origin, {minX: x, minY: y, maxX: x + width, maxY: y + height});
    }
}

export default NodeLeaf;
