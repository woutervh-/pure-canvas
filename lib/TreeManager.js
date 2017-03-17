"use strict";
var rbush = require('rbush');
var TreeManager = (function () {
    function TreeManager(nodeIndexable) {
        this.tree = rbush();
        this.nodeIndexable = nodeIndexable;
    }
    TreeManager.prototype.reindex = function () {
        var _this = this;
        this.tree.clear();
        this.nodeIndexable.index(function (node, zIndex, transformers) {
            var bounds = node.getBounds();
            var _a = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.minX, y: bounds.minY }), x1 = _a.x, y1 = _a.y;
            var _b = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.maxX, y: bounds.maxY }), x2 = _b.x, y2 = _b.y;
            var _c = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.minX, y: bounds.maxY }), x3 = _c.x, y3 = _c.y;
            var _d = transformers.reduce(function (point, transformer) { return transformer.transform(point); }, { x: bounds.maxX, y: bounds.minY }), x4 = _d.x, y4 = _d.y;
            var minX = Math.min(x1, x2, x3, x4);
            var minY = Math.min(y1, y2, y3, y4);
            var maxX = Math.max(x1, x2, x3, x4);
            var maxY = Math.max(y1, y2, y3, y4);
            _this.tree.insert({
                minX: minX, minY: minY, maxX: maxX, maxY: maxY,
                transformers: transformers, node: node, zIndex: zIndex
            });
        }, 0);
    };
    TreeManager.prototype.intersection = function (point) {
        var results = this.tree
            .search({ minX: point.x, minY: point.y, maxX: point.x, maxY: point.y })
            .sort(function (a, b) { return b.zIndex - a.zIndex; });
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var indexedNode = results_1[_i];
            var untransformedPoint = indexedNode.transformers.reduceRight(function (point, transformer) { return transformer.untransform(point); }, point);
            var node = indexedNode.node.intersection(untransformedPoint);
            if (node) {
                return node;
            }
        }
    };
    return TreeManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeManager;
;
//# sourceMappingURL=TreeManager.js.map