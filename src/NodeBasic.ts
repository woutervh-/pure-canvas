import Node, {Bounds, Point} from './Node';
import NodeIndexable from './NodeIndexable';
import Transformer from './Transformer';

abstract class NodeBasic implements NodeIndexable {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void;

    abstract intersection(point: Point): Node;

    toImage(clipRegion?: Bounds): HTMLCanvasElement {
        const {minX, minY, maxX, maxY} = clipRegion ? clipRegion : this.getBounds();
        const {minX: realMinX, minY: realMinY} = clipRegion ? this.getBounds() : {minX, minY};
        const canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        const context = canvas.getContext('2d');
        context.translate(-realMinX - minX, -realMinY - minY);
        this.draw(context);
        context.translate(realMinX + minX, realMinY + minY);
        return canvas;
    }

    abstract index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void;

    abstract isHitEnabled(): boolean;

    abstract setHitEnabled(value: boolean): void;
}

export default NodeBasic;
