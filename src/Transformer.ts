import Node, {Point, StepGenerator} from './Node';
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

    steps(): StepGenerator {
        const steps = super.steps();
        let hasPreDrawn = false;
        let hasPostDrawn = false;

        return {
            next: (commit, context) => {
                if (hasPostDrawn) {
                    return true;
                }
                if (!hasPreDrawn) {
                    this.preDraw(context);
                }
                const result = steps.next(commit, context);
                if (result) {
                    this.postDraw(context);
                    hasPostDrawn = true;
                }
                return false;
            }
        };
    }

    index(action: (node: Node, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number): number {
        return super.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            action(node, zIndex, [...transformers, this]);
        }, zIndex);
    }
}

export default Transformer;
