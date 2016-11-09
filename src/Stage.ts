import Node, {Bounds, Point} from './Node';
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

    private eventToElementCoordinate({clientX, clientY}: MouseEvent, element: HTMLCanvasElement = this.canvas): {x: number, y: number} {
        const {left, top} = element.getBoundingClientRect();
        return {
            x: Math.round(clientX - left),
            y: Math.round(clientY - top)
        };
    }

    private emitHitEvent(name: string, event: MouseEvent): void {
        const point = this.eventToElementCoordinate(event);

        const results = this.tree
            .search({minX: point.x, minY: point.y, maxX: point.x, maxY: point.y})
            .sort((a: IndexedNode, b: IndexedNode) => b.zIndex - a.zIndex)
            .map((indexedNode: IndexedNode) => {
                const untransformedPoint = indexedNode.transformers.reduceRight((point: Point, transformer: Transformer) => transformer.untransform(point), point);
                return indexedNode.node.intersection(untransformedPoint);
            })
            .filter(Boolean);

        this.emit(name, results[0], event);
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

        this.tree.clear();
        this.internalLayer.index((node: Node, zIndex: number, transformers: Array<Transformer>) => {
            const bounds = node.getBounds();
            const {x: minX, y: minY} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.minX, y: bounds.minY})
            const {x: maxX, y: maxY} = transformers.reduce((point: Point, transformer: Transformer) => transformer.transform(point), {x: bounds.maxX, y: bounds.maxY})
            this.tree.insert({minX, minY, maxX, maxY, transformers, node, zIndex});
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
