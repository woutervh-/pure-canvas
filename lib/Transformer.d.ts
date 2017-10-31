import { Point } from './Node';
interface Transformer {
    transform(point: Point): Point;
    untransform(point: Point): Point;
}
export default Transformer;
