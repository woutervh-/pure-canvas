"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSafeContext(canvas) {
    const context = canvas.getContext('2d');
    if (context === null) {
        throw new Error('Failed to obtain 2D rendering context');
    }
    else {
        return context;
    }
}
exports.getSafeContext = getSafeContext;
//# sourceMappingURL=util.js.map