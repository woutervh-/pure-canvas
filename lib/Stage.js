"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = require("eventemitter3");
const util_1 = require("./util");
class Stage extends eventemitter3_1.EventEmitter {
    constructor(canvas) {
        super();
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
        this.context = util_1.getSafeContext(canvas);
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
            if (!didSearch && this.internalNode) {
                const point = this.eventToElementCoordinate(event);
                result = this.internalNode.intersection(point);
                didSearch = true;
            }
            return result;
        }, event);
    }
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.internalNode) {
            this.internalNode.draw(this.context);
        }
    }
    renderAsynchronous(maxBatchTime = 10) {
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
    get node() {
        return this.internalNode;
    }
    set node(value) {
        this.internalNode = value;
    }
    on(event, fn, context) {
        return super.on(event, fn, context);
    }
    ;
}
exports.default = Stage;
;
//# sourceMappingURL=Stage.js.map