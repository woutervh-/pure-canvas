import {EventEmitter} from 'eventemitter3';
import Node from './Node';
import NodeIndexable from './NodeIndexable';
import Layer from './Layer';

export default class Stage extends EventEmitter {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private internalNode?: Node;

    private nonBlockingTimeoutId?: number;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

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
        let result: Node = undefined;
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

    renderAsynchronous(index: boolean = true, maxBatchTime: number = 10): void {
        const steps = this.node.steps();

        if (this.nonBlockingTimeoutId) {
            window.clearTimeout(this.nonBlockingTimeoutId);
        }

        let i = 0;
        const repeat = () => {
            this.nonBlockingTimeoutId = window.setTimeout(batch, 0);
        };
        const batch = () => {
            const deadline = Date.now() + maxBatchTime;
            while (i < steps.length && Date.now() < deadline) {
                steps[i++]();
            }
            commit(false);
            if (i < steps.length) {
                repeat();
            } else {
                commit(index);
            }
        };
        repeat();
    }

    get node(): Node {
        return this.internalNode;
    }

    set node(value: Node) {
        this.internalNode = value;
    }
};
