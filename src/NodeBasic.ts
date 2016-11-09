import Node, {Bounds, Point} from './Node';
import NodeIndexable from './NodeIndexable';
import Transformer from './Transformer';

abstract class NodeBasic implements NodeIndexable {
    _hitEnabled: boolean = true;

    abstract getBounds(): Bounds;

    abstract draw(context: CanvasRenderingContext2D): void;

    abstract intersection(point: Point): Node;

    toImage(): HTMLCanvasElement {
        const {minX, minY, maxX, maxY} = this.getBounds();
        const canvas = document.createElement('canvas');
        canvas.width = maxX - minX;
        canvas.height = maxY - minY;
        this.draw(canvas.getContext('2d'));
        return canvas;
    }

    abstract index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void;

    isHitEnabled(): boolean {
        return this._hitEnabled;
    }

    setHitEnabled(value: boolean): void {
        this._hitEnabled = value;
    }
}

export default NodeBasic;
