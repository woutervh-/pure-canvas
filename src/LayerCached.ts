import Node, {Point, Bounds} from './Node';
import Layer from './Layer';
import TreeManager from './TreeManager';
import Transformer from './Transformer';
import NodeIndexable from './NodeIndexable';
import {getSafeContext} from './util';

export default class LayerCached<T> extends Layer<T> {
    private caching: boolean = false;

    private cache: HTMLCanvasElement;

    private generator: (context?: CanvasRenderingContext2D) => boolean;

    private treeManager: TreeManager<T>;

    private indexFinished: boolean = false;

    private clipRegion?: Bounds;

    private cachedBounds?: Bounds;

    constructor(options: {clipRegion?: Bounds} = {}) {
        super();
        this.clipRegion = options.clipRegion;
    }

    getBounds(): Bounds {
        if (!this.cachedBounds) {
            if (this.clipRegion) {
                // const {minX: clipMinX, minY: clipMinY, maxX: clipMaxX, maxY: clipMaxY} = this.clipRegion;
                // const {minX, minY, maxX, maxY} = super.getBounds();
                // this.cachedBounds = {
                //     minX: Math.max(minX, clipMinX),
                //     minY: Math.max(minY, clipMinY),
                //     maxX: Math.min(maxX, clipMaxX),
                //     maxY: Math.min(maxY, clipMaxY)
                // };
                this.cachedBounds = this.clipRegion;
            } else {
                this.cachedBounds = super.getBounds();
            }
        }
        return this.cachedBounds;
    }

    draw(context: CanvasRenderingContext2D): void {
        if (this.caching) {
            super.draw(context);
        } else {
            const {minX, minY, maxX, maxY} = this.getBounds();
            if (!this.cache) {
                this.caching = true;
                this.cache = this.toImage();
                this.caching = false;
            } else if (maxX - minX > 0 && maxY - minY > 0) {
                context.drawImage(this.cache, minX, minY, maxX - minX, maxY - minY);
            }
        }
    }

    steps(): (context?: CanvasRenderingContext2D) => boolean {
        if (!this.generator) {
            const {minX, minY, maxX, maxY} = this.getBounds();
            const width = maxX - minX;
            const height = maxY - minY;
            const cache = document.createElement('canvas');
            cache.width = width;
            cache.height = height;
            const cacheContext = getSafeContext(cache);
            if (!this.indexFinished) {
                this.treeManager = new TreeManager();
            }
            const action = (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => {
                this.treeManager.index(node, zIndex, transformers);
            };

            const children = this.children[Symbol.iterator]();
            let zIndex = 0;
            let nextChild: IteratorResult<NodeIndexable<T>> | null = null;
            let next: ((context?: CanvasRenderingContext2D) => boolean) | null = null;
            let first: boolean = true;
            let last: boolean = false;
            this.generator = (context) => {
                if (this.cache) {
                    if (context) {
                        context.drawImage(this.cache, minX, minY, width, height);
                    }
                    return true;
                } else {
                    if (context) {
                        context.drawImage(cache, minX, minY, width, height);
                    } else {
                        if (!next) {
                            if (first) {
                                cacheContext.translate(-minX, -minY);
                                first = false;
                            }
                            nextChild = children.next();
                            if (!nextChild.done) {
                                next = nextChild.value.steps();
                            } else {
                                cacheContext.translate(minX, minY);
                                this.cache = cache;
                                this.indexFinished = true;
                                last = true;
                            }
                        }
                        if (next && nextChild && next()) {
                            next(cacheContext);
                            if (!this.indexFinished) {
                                if (nextChild.value.isHitEnabled()) {
                                    zIndex = nextChild.value.index(action, zIndex, []) + 1;
                                }
                            }
                            next = null;
                            nextChild = null;
                        }
                    }
                    return !next && last;
                }
            };
        }
        return this.generator;
    }

    index(action: (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => void, zIndex: number, transformers: Array<Transformer>): number {
        action(this, zIndex, transformers);
        return zIndex;
    }

    intersection(point: Point): Node<T> | undefined {
        if (!this.treeManager) {
            this.treeManager = new TreeManager();
            const action = (node: Node<T>, zIndex: number, transformers: Array<Transformer>) => {
                this.treeManager.index(node, zIndex, transformers);
            };
            let zIndex = 0;
            for (const child of this.children) {
                if (child.isHitEnabled()) {
                    zIndex = child.index(action, zIndex, []) + 1;
                }
            }
            this.indexFinished = true;
        }

        return this.treeManager.intersection(point);
    }
};
