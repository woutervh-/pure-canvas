import Node, { Point } from './Node';
import Layer from './Layer';
import Transformer from './Transformer';
declare abstract class TransformerBase<T> extends Layer<T> implements Transformer {
    abstract transform(point: Point): Point;
    abstract untransform(point: Point): Point;
    abstract preDraw(context: CanvasRenderingContext2D): void;
    abstract postDraw(context: CanvasRenderingContext2D): void;
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
}
export default TransformerBase;
