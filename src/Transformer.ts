import Node, {Point} from './Node';
import Layer from './Layer';

abstract class Transformer extends Layer {
    abstract transform(point: Point): Point;

    abstract untransform(point: Point): Point;

    abstract preDraw(context: CanvasRenderingContext2D): void;

    abstract postDraw(context: CanvasRenderingContext2D): void;

    constructor() {
        super();
    }

    draw(context: CanvasRenderingContext2D): void {
        this.preDraw(context);
        super.draw(context);
        this.postDraw(context);
    }

    drawDeferred(stepAccumulator: Array<() => void>, commitAccumulator: Array<(context: CanvasRenderingContext2D) => void>): void {
        commitAccumulator.push((context) => this.preDraw(context));
        super.drawDeferred(stepAccumulator, commitAccumulator);
        commitAccumulator.push((context) => this.postDraw(context));
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): number {
        return super.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
    }
}

export default Transformer;
