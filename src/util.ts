export function getSafeContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');
    if (context === null) {
        throw new Error('Failed to obtain 2D rendering context');
    } else {
        return context;
    }
}
