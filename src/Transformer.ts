import Node, {Point} from './Node';
import Layer from './Layer';
import NodeIndexable from './NodeIndexable';

abstract class Transformer extends Layer {
    abstract transform(point: Point): Point;

    abstract untransform(point: Point): Point;

    abstract preDraw(context: CanvasRenderingContext2D): void;

    abstract postDraw(context: CanvasRenderingContext2D): void;

    constructor() {
        super();
    }

    add(node: NodeIndexable, transformer?: Transformer): number {
        return super.add(node, this);
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
}

export default Transformer;
