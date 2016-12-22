import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stage from '../src/Stage';
import Circle from '../src/Circle';
import CanvasImage from '../src/Image';
import Line from '../src/Line';
import Rectangle from '../src/Rectangle';
import Polygon from '../src/Polygon';
import Translate from '../src/Translate';
import Transform from '../src/Transform';
import Scale from '../src/Scale';
import colors from './colors';
import * as triangle from './triangle.svg';
import LayerCached from '../src/LayerCached';

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class IdentifiedImage extends CanvasImage {
    id: number;
    type: string = 'image';
}

class IdentifiedCircle extends Circle {
    id: number;
    type: string = 'circle';
}

class IdentifiedLine extends Line {
    id: number;
    type: string = 'line';
}

class IdentifiedRectangle extends Rectangle {
    id: number;
    type: string = 'rectangle';
}

class IdentifiedPolygon extends Polygon {
    id: number;
    type: string = 'polygon';
}

class App extends React.Component<{}, {}> {
    renderToCanvas(canvas: HTMLCanvasElement) {
        const triangleImage = new Image();

        function onImageLoaded() {
            const stage = new Stage(canvas);
            const hoverLayer = new Translate();
            const scaledHoverLayer = new Scale({x: 2, y: 2});
            const cachedLayer = new LayerCached({clipRegion: {minX: 0, minY: 0, maxX: 400, maxY: 400}});

            const hoverImage = new CanvasImage({width: 24, height: 24, image: triangleImage});
            const hoverCircle = new Circle({radius: 10, fillStyle: 'white'});
            const hoverLine = new Line({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 5});
            const hoverRectangle = new Rectangle({x1: 0, y1: 0, x2: 8, y2: 8, strokeStyle: 'red'});
            const hoverPolygon = new Polygon({points: [[{x: 5, y: 5}, {x: 15, y: 5}, {x: 15, y: 15}, {x: 5, y: 15}], [{x: 7, y: 7}, {x: 7, y: 13}, {x: 13, y: 7}]], fillStyle: 'green'});

            for (let i = 0; i < 400; i++) {
                const image = new IdentifiedImage({width: 20, height: 20, image: triangleImage});
                const circle = new IdentifiedCircle({radius: 8, fillStyle: getRandomColor()});
                const line = new IdentifiedLine({x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 3});
                const rectangle = new IdentifiedRectangle({x1: 0, y1: 0, x2: 8, y2: 8});
                const polygon = new IdentifiedPolygon({points: [[{x: 5, y: 5}, {x: 15, y: 5}, {x: 15, y: 15}, {x: 5, y: 15}], [{x: 7, y: 7}, {x: 7, y: 13}, {x: 13, y: 7}]]});
                image.setHitEnabled(true);
                circle.setHitEnabled(true);
                line.setHitEnabled(true);
                rectangle.setHitEnabled(true);
                polygon.setHitEnabled(true);
                image.id = i;
                circle.id = i;
                line.id = i;
                rectangle.id = i;
                polygon.id = i;
                const layer = new Transform();
                layer.rotate(Math.PI / 8);
                layer.translate((i % 20) * 20, Math.floor(i / 20) * 20);
                layer.scale(2, 2);
                layer.add(image);
                // layer.add(circle);
                // layer.add(line);
                // layer.add(rectangle);
                layer.add(polygon);
                cachedLayer.add(layer);
            }

            scaledHoverLayer.add(hoverLayer);
            stage.add(cachedLayer);
            stage.add(scaledHoverLayer);
            stage.render();

            stage.on('mousemove', getNode => {
                hoverLayer.removeAll();
                const node = getNode();
                if (node) {
                    switch (node.type) {
                        case 'image':
                            hoverLayer.x = (node.id % 20) * 20 - 2;
                            hoverLayer.y = Math.floor(node.id / 20) * 20 - 2;
                            hoverLayer.add(hoverImage);
                            break;
                        case 'circle':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverCircle);
                            break;
                        case 'line':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverLine);
                            break;
                        case 'rectangle':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverRectangle);
                            break;
                        case 'polygon':
                            hoverLayer.x = (node.id % 20) * 20;
                            hoverLayer.y = Math.floor(node.id / 20) * 20;
                            hoverLayer.add(hoverPolygon);
                            break;
                        default:
                            break;
                    }
                }
                stage.render();
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
        return <canvas width={400} height={400} ref={(r: HTMLCanvasElement) => this.renderToCanvas(r)}>
            Your browser does not support the HTML5 canvas tag.
        </canvas>;
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
    <App/>,
    container
);
