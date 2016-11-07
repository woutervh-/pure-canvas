import Node from './Node';
import NodeCollection from './NodeCollection';
import {EventEmitter} from 'eventemitter3';
import Layer from './Layer';

export default class Stage extends EventEmitter implements NodeCollection {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private internalLayer: Layer = new Layer();

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

    private eventToElementCoordinate({clientX, clientY}: MouseEvent, element: HTMLCanvasElement = this.canvas): {x: number, y: number} {
        const {left, top} = element.getBoundingClientRect();
        return {
            x: Math.round(clientX - left),
            y: Math.round(clientY - top)
        };
    }

    private emitHitEvent(name: string, event: MouseEvent): void {
        const point = this.eventToElementCoordinate(event);
        const result = this.internalLayer.intersection(point);
        this.emit(name, result, event);
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
        this.internalLayer.draw(this.context);
    }

    add(node: Node): number {
        return this.internalLayer.add(node);
    }

    remove(a: number|Node): void {
        this.internalLayer.remove(a);
    }

    removeAll(): void {
        this.internalLayer.removeAll();
    }

    count(): number {
        return this.internalLayer.count();
    }
};
