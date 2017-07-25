import Node, {Bounds, Point} from './Node';
import NodeIndexable from './NodeIndexable';
import Transformer from './Transformer';

abstract class NodeBase implements NodeIndexable {
    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract steps(): (context?: CanvasRenderingContext2D) => boolean;

    abstract intersection(point: Point): Node;

    toImage(): HTMLCanvasElement {
        const {minX, minY, maxX, maxY} = this.getBounds();
        const canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        const context = canvas.getContext('2d');
        context.translate(-minX, -minY);
        this.draw(context);
        context.translate(minX, minY);
        return canvas;
    }

    abstract index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;

    abstract isHitEnabled(): boolean;

    abstract setHitEnabled(value: boolean): void;
}

export default NodeBase;
