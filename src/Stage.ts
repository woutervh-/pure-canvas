import {EventEmitter} from 'eventemitter3';
import Node from './Node';
import NodeIndexable from './NodeIndexable';
import NodeCollection from './NodeCollection';
import Layer from './Layer';
import TreeManager from './TreeManager';

export default class Stage extends EventEmitter implements NodeCollection {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private internalLayer: Layer = new Layer();

    private treeManager: TreeManager = new TreeManager(this.internalLayer);

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
            if (!didSearch) {
                const point = this.eventToElementCoordinate(event);
                result = this.treeManager.intersection(point);
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

    render(index: boolean = true): void {
        const {steps, commit} = this.renderDeferred();
        for (const step of steps) {
            step();
        }
        commit(index);
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.internalLayer.draw(this.context);
        // this.index();
    }

    renderDeferred(): {steps: Array<() => void>, commit: (index: boolean) => void} {
        const stepAccumulator: Array<() => void> = [];
        const commitAccumulator: Array<() => void> = [];
        this.internalLayer.drawDeferred(this.context, stepAccumulator, commitAccumulator);

        const commit = (index: boolean = false) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (const commit of commitAccumulator) {
                commit();
            }
            if (index) {
                this.index();
            }
        };

        return {steps: stepAccumulator, commit};
    }

    index(): void {
        this.treeManager.reindex();
    }

    add(node: NodeIndexable): number {
        return this.internalLayer.add(node);
    }

    remove(a: number|NodeIndexable): void {
        this.internalLayer.remove(a);
    }

    removeAll(): void {
        this.internalLayer.removeAll();
    }

    count(): number {
        return this.internalLayer.count();
    }
};
