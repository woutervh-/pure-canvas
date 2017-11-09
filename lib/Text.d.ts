import { Point } from './Node';
import NodeFixedBounds from './NodeFixedBounds';
export interface TextStyle {
    fillStyle?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    fontSize?: number;
    fontFamily?: string;
    textBaseline?: string;
    textAlign?: string;
    text: string;
}
export interface TextParameters extends TextStyle {
    x?: number;
    y?: number;
}
declare class Text<T> extends NodeFixedBounds<T> {
    private x;
    private y;
    private fillStyle;
    private font;
    private text;
    private textBaseline;
    private textAlign;
    private direction;
    constructor({x, y, fillStyle, fontStyle, fontVariant, fontWeight, fontSize, fontFamily, textBaseline, textAlign, text}: TextParameters);
    draw(context: CanvasRenderingContext2D): void;
    intersection({x: px, y: py}: Point): Text<T> | undefined;
}
export default Text;
