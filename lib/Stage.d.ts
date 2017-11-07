import { EventEmitter } from 'eventemitter3';
import Node from './Node';
export default class Stage<T = {}> extends EventEmitter {
    private canvas;
    private context;
    private internalNode?;
    private nonBlockingTimeoutId?;
    constructor(canvas: HTMLCanvasElement);
    destroy(): void;
    eventToElementCoordinate({clientX, clientY}: MouseEvent, element?: HTMLCanvasElement): {
        x: number;
        y: number;
    };
    emitHitEvent(name: string, event: MouseEvent): void;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleClick;
    render(): void;
    renderAsynchronous(maxBatchTime?: number): void;
    node: Node<T> | undefined;
}
