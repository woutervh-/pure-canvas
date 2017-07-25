import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stage from '../src/Stage';
import Circle, {CircleParameters} from '../src/Circle';
import CanvasImage from '../src/Image';
import Line from '../src/Line';
import LineString from '../src/LineString';
import Rectangle from '../src/Rectangle';
import Polygon from '../src/Polygon';
import Translate from '../src/Translate';
import Transform from '../src/Transform';
import Scale from '../src/Scale';
import colors from './colors';
import * as triangle from './triangle.svg';
import Layer from '../src/Layer';
import LayerCached from '../src/LayerCached';

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class App extends React.Component<{}, {}> {
    renderToCanvas(canvas: HTMLCanvasElement) {
        const triangleImage = new Image();

        function onImageLoaded() {
            const stage = new Stage(canvas);
            const hoverLayer = new Translate();
            const scaledHoverLayer = new Scale({x: 2, y: 2});
            const cachedLayer = new LayerCached({clipRegion: {minX: 5, minY: 5, maxX: 795, maxY: 795}});

            const hoverImage = new CanvasImage({width: 24, height: 24, image: triangleImage});
            const hoverCircle = new Circle({radius: 10, fillStyle: 'white'});
            const hoverLine = new Line({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 5});
            const hoverLineString = new LineString({points: [{x: 0, y: 10}, {x: 10, y: 0}, {x: 20, y: 10}], lineWidth: 3});
            const hoverRectangle = new Rectangle({x1: 0, y1: 0, x2: 8, y2: 8, strokeStyle: 'red'});
            const hoverPolygon = new Polygon({points: [[{x: 5, y: 5}, {x: 15, y: 5}, {x: 15, y: 15}, {x: 5, y: 15}], [{x: 7, y: 7}, {x: 7, y: 13}, {x: 13, y: 7}]], fillStyle: 'green'});

            function* circleGenerator() {
                for (let i = 0; i < 1e2; i++) {
                    const circle = new Circle({x: Math.random() * 800, y: Math.random() * 800, radius: 8, fillStyle: getRandomColor()});
                    circle.setHitEnabled(true);
                    yield circle;
                }
            }

            cachedLayer.setChildren({[Symbol.iterator]: () => circleGenerator()});
            scaledHoverLayer.setChildren([hoverLayer]);
            const root = new Layer();
            root.setChildren([cachedLayer, scaledHoverLayer]);
            stage.node = root;
            stage.renderAsynchronous();

            stage.on('click', getNode => {
                hoverLayer.setChildren([]);
                const node = getNode();
                if (node) {
                    if (node instanceof Circle) {
                        hoverLayer.x = node.x / 2;
                        hoverLayer.y = node.y / 2;
                        hoverLayer.setChildren([hoverCircle]);
                    }

                    // switch (node.type) {
                    //     case 'image':
                    //         hoverLayer.x = (node.id % 20) * 20 - 2;
                    //         hoverLayer.y = Math.floor(node.id / 20) * 20 - 2;
                    //         hoverLayer.add(hoverImage);
                    //         break;
                    //     case 'circle':
                    //         hoverLayer.x = node.x / 2;
                    //         hoverLayer.y = node.y / 2;
                    //         hoverLayer.add(hoverCircle);
                    //         break;
                    //     case 'line':
                    //         hoverLayer.x = (node.id % 20) * 20;
                    //         hoverLayer.y = Math.floor(node.id / 20) * 20;
                    //         hoverLayer.add(hoverLine);
                    //         break;
                    //     case 'line-string':
                    //         hoverLayer.x = (node.id % 20) * 20;
                    //         hoverLayer.y = Math.floor(node.id / 20) * 20;
                    //         hoverLayer.add(hoverLineString);
                    //         break;
                    //     case 'rectangle':
                    //         hoverLayer.x = (node.id % 20) * 20;
                    //         hoverLayer.y = Math.floor(node.id / 20) * 20;
                    //         hoverLayer.add(hoverRectangle);
                    //         break;
                    //     case 'polygon':
                    //         hoverLayer.x = (node.id % 20) * 20;
                    //         hoverLayer.y = Math.floor(node.id / 20) * 20;
                    //         hoverLayer.add(hoverPolygon);
                    //         break;
                    //     default:
                    //         break;
                    // }
                }
                stage.renderAsynchronous();
            });
        }

        triangleImage.src = triangle;
        if (triangleImage.complete) {
            onImageLoaded();
        } else {
            triangleImage.onload = onImageLoaded;
        }
    }

    render() {
        return <canvas width={800} height={800} ref={(r: HTMLCanvasElement) => this.renderToCanvas(r)}>
            Your browser does not support the HTML5 canvas tag.
        </canvas>;
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<App/>, container);
