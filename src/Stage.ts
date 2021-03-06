import {EventEmitter, ListenerFn} from 'eventemitter3';
import Node from './Node';
import {getSafeContext} from './util';

export default class Stage<T = {}> extends EventEmitter {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private internalNode?: Node<T>;

    private nonBlockingTimeoutId?: number;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.context = getSafeContext(canvas);

        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleClick);
    }

    destroy(): void {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('click', this.handleClick);
    }

    eventToElementCoordinate({clientX, clientY}: MouseEvent, element: HTMLCanvasElement = this.canvas): {x: number, y: number} {
        const {left, top} = element.getBoundingClientRect();
        return {
            x: Math.round(clientX - left),
            y: Math.round(clientY - top)
        };
    }

    emitHitEvent(name: string, event: MouseEvent): void {
        let didSearch: boolean = false;
        let result: Node<T> | undefined = undefined;
        this.emit(name, () => {
            if (!didSearch && this.internalNode) {
                const point = this.eventToElementCoordinate(event);
                result = this.internalNode.intersection(point);
                didSearch = true;
            }
            return result;
        }, event);
    }

    private handleMouseDown = (event: MouseEvent) => {
        this.emitHitEvent('mousedown', event);
    };

    private handleMouseMove = (event: MouseEvent) => {
        this.emitHitEvent('mousemove', event);
    };

    private handleMouseUp = (event: MouseEvent) => {
        this.emitHitEvent('mouseup', event);
    };

    private handleClick = (event: MouseEvent) => {
        this.emitHitEvent('click', event);
    };

    render(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.internalNode) {
            this.internalNode.draw(this.context);
        }
    }

    renderAsynchronous(maxBatchTime: number = 10): void {
        if (this.node) {
            const that = this;
            const next = this.node.steps();
            let done = false;

            (function batch() {
                if (that.nonBlockingTimeoutId) {
                    window.clearTimeout(that.nonBlockingTimeoutId);
                }

                const deadline = performance.now() + maxBatchTime;
                while (!done && performance.now() < deadline) {
                    done = next();
                }

                that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
                next(that.context);
                if (!done) {
                    that.nonBlockingTimeoutId = window.setTimeout(batch, 0);
                }
            })();
        }
    }

    get node(): Node<T> | undefined {
        return this.internalNode;
    }

    set node(value: Node<T> | undefined) {
        this.internalNode = value;
    }

    on(event: 'mousedown', fn: (getNode: () => Node<T> | undefined, event: MouseEvent) => void, context?: any): this;
    on(event: 'mousemove', fn: (getNode: () => Node<T> | undefined, event: MouseEvent) => void, context?: any): this;
    on(event: 'mouseup', fn: (getNode: () => Node<T> | undefined, event: MouseEvent) => void, context?: any): this;
    on(event: 'click', fn: (getNode: () => Node<T> | undefined, event: MouseEvent) => void, context?: any): this;
    on(event: string | symbol, fn: ListenerFn, context?: any): this {
        return super.on(event, fn, context);
    };
};
