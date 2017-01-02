"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeFixedBounds_1 = require('./NodeFixedBounds');
var Dummy = (function (_super) {
    __extends(Dummy, _super);
    function Dummy() {
        _super.call(this, { minX: 0, minY: 0, maxX: 0, maxY: 0 });
    }
    Dummy.prototype.draw = function (context) {
    };
    Dummy.prototype.intersection = function (_a) {
        var x = _a.x, y = _a.y;
        return null;
    };
    return Dummy;
}(NodeFixedBounds_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dummy;
//# sourceMappingURL=Dummy.js.map