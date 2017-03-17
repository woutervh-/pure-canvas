"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_1 = require('./Layer');
var Transformer = (function (_super) {
    __extends(Transformer, _super);
    function Transformer() {
        _super.apply(this, arguments);
    }
    Transformer.prototype.draw = function (context) {
        this.preDraw(context);
        _super.prototype.draw.call(this, context);
        this.postDraw(context);
    };
    Transformer.prototype.drawDeferred = function (context, stepAccumulator, commitAccumulator) {
        var _this = this;
        commitAccumulator.push(function () { return _this.preDraw(context); });
        _super.prototype.drawDeferred.call(this, context, stepAccumulator, commitAccumulator);
        commitAccumulator.push(function () { return _this.postDraw(context); });
    };
    Transformer.prototype.index = function (action, zIndex) {
        var _this = this;
        return _super.prototype.index.call(this, function (node, zIndex, transformers) {
            action(node, zIndex, transformers.concat([_this]));
        }, zIndex);
    };
    return Transformer;
}(Layer_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Transformer;
//# sourceMappingURL=Transformer.js.map