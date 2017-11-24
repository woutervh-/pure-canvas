import Node, { Point, Bounds } from './Node';
import Layer from './Layer';
import Transformer from './Transformer';
export default class LayerCached<T> extends Layer<T> {
    private caching;
    private cache;
    private generator;
    private treeManager;
    private indexFinished;
    private clipRegion?;
    private cachedBounds?;
    constructor(options?: {
        clipRegion?: Bounds;
    });
    getBounds(): Bounds;
    draw(context: CanvasRenderingContext2D): void;
    steps(): (context?: CanvasRenderingContext2D) => boolean;
    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number;
    intersection(point: Point): Node<T> | undefined;
}
