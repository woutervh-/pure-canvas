"use strict";
const eventemitter3_1 = require('eventemitter3');
const Layer_1 = require('./Layer');
const TreeManager_1 = require('./TreeManager');
class Stage extends eventemitter3_1.EventEmitter {
    constructor(canvas) {
        super();
        this.internalLayer = new Layer_1.default();
        this.treeManager = new TreeManager_1.default(this.internalLayer);
        this.handleMouseDown = (event) => {
            this.emitHitEvent('mousedown', event);
        };
        this.handleMouseMove = (event) => {
            this.emitHitEvent('mousemove', event);
        };
        this.handleMouseUp = (event) => {
            this.emitHitEvent('mouseup', event);
        };
        this.handleClick = (event) => {
            this.emitHitEvent('click', event);
        };
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleClick);
    }
    destroy() {
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('click', this.handleClick);
    }
    eventToElementCoordinate({ clientX, clientY }, element = this.canvas) {
        const { left, top } = element.getBoundingClientRect();
        return {
            x: Math.round(clientX - left),
            y: Math.round(clientY - top)
        };
    }
    emitHitEvent(name, event) {
        let didSearch = false;
        let result = undefined;
        this.emit(name, () => {
            if (!didSearch) {
                const point = this.eventToElementCoordinate(event);
                result = this.treeManager.intersection(point);
                didSearch = true;
            }
            return result;
        }, event);
    }
    render(index = true) {
        const { steps, commit } = this.renderDeferred();
        for (const step of steps) {
            step();
        }
        commit(index);
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.internalLayer.draw(this.context);
        // this.index();
    }
    renderAsynchronous(index = true, maxBatchTime = 10) {
        const { steps, commit } = this.renderDeferred();
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
            }
            else {
                commit(index);
            }
        };
        repeat();
    }
    renderDeferred() {
        const stepAccumulator = [];
        const commitAccumulator = [];
        this.internalLayer.drawDeferred(stepAccumulator, commitAccumulator);
        const commit = (index = false) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (const commit of commitAccumulator) {
                commit(this.context);
            }
            if (index) {
                this.index();
            }
        };
        return { steps: stepAccumulator, commit };
    }
    index() {
        this.treeManager.reindex();
    }
    add(node) {
        return this.internalLayer.add(node);
    }
    remove(a) {
        this.internalLayer.remove(a);
    }
    removeAll() {
        this.internalLayer.removeAll();
    }
    count() {
        return this.internalLayer.count();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stage;
;
//# sourceMappingURL=Stage.js.map