import Node, {Bounds, Point} from './Node';

let counter = 0;

abstract class NodeBasic implements Node {
    private _id = counter++;

    get id() {
        return this._id;
    }

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

    abstract isHitEnabled(): boolean;

    abstract setHitEnabled(value: boolean): void;
}

export default NodeBasic;
