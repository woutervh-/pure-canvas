import Node, {Point} from './Node';
import Layer from './Layer';
import Transformer from './Transformer';

abstract class TransformerBase extends Layer implements Transformer {
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

    steps(): (context?: CanvasRenderingContext2D) => boolean {
        const next = super.steps();
        return (context) => {
            if (context) {
                this.preDraw(context);
                const result = next(context);
                this.postDraw(context);
                return result;
            } else {
                return next();
            }
        };
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number {
        return super.index(action, zIndex, [...transformers, this]);
    }
}

export default TransformerBase;
