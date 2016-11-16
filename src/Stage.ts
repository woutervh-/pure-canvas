import Node, {Point} from './Node';
import NodeIndexable from './NodeIndexable';
import NodeCollection from './NodeCollection';
import Transformer from './Transformer';
import {EventEmitter} from 'eventemitter3';
import Layer from './Layer';
import * as rbush from 'rbush';

interface IndexedNode extends rbush.BBox {
    transformers: Array<Transformer>;
    node: Node;
    zIndex: number;
}

export default class Stage extends EventEmitter implements NodeCollection {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private internalLayer: Layer = new Layer();

    private tree: rbush.RBush<IndexedNode> = rbush<IndexedNode>();

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
                const results = this.tree
                    .search({minX: point.x, minY: point.y, maxX: point.x, maxY: point.y})
                    .sort((a: IndexedNode, b: IndexedNode) => b.zIndex - a.zIndex)
                    .map((indexedNode: IndexedNode) => {
                        const untransformedPoint = indexedNode.transformers.reduceRight((point: Point, transformer: Transformer) => transformer.untransform(point), point);
                        return indexedNode.node.intersection(untransformedPoint);
                    })
                    .filter(Boolean);
                result = results[0];
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
        this.internalLayer.draw(this.context);
        this.index();
    }

    index(): void {
        this.tree.clear();
        this.internalLayer.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            const bounds = node.getBounds();
            const {x: x1, y: y1} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.minY});
            const {x: x2, y: y2} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.maxY});
            const {x: x3, y: y3} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.maxY});
            const {x: x4, y: y4} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.minY});
            const minX = Math.min(x1, x2, x3, x4);
            const minY = Math.min(y1, y2, y3, y4);
            const maxX = Math.max(x1, x2, x3, x4);
            const maxY = Math.max(y1, y2, y3, y4);
            this.tree.insert({
                minX, minY, maxX, maxY,
                transformers, node, zIndex
            });
        }, 0);
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
