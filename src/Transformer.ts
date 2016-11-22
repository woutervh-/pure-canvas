import Node, {Point} from './Node';
import Layer from './Layer';

abstract class Transformer extends Layer {
    abstract transform(point: Point): Point;

    abstract untransform(point: Point): Point;

    abstract preDraw(context: CanvasRenderingContext2D): void;

    abstract postDraw(context: CanvasRenderingContext2D): void;

    draw(context: CanvasRenderingContext2D): void {
        this.preDraw(context);
        super.draw(context);
        this.postDraw(context);
    }

    drawDeferred(context: CanvasRenderingContext2D, stepAccumulator: Array<() => void>, commitAccumulator: Array<() => void>): void {
        commitAccumulator.push(() => this.preDraw(context));
        super.drawDeferred(context, stepAccumulator, commitAccumulator);
        commitAccumulator.push(() => this.postDraw(context));
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): void {
        super.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
    }
}

export default Transformer;
