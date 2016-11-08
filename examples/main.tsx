import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Stage from '../src/Stage';
import Circle from '../src/Circle';
import CanvasImage from '../src/Image';
import Translate from '../src/Translate';
import colors from './colors';
import * as triangle from './triangle.svg';
import LayerCached from '../src/LayerCached';

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class IdentifiedImage extends CanvasImage {
    id: number;
}

class App extends React.Component<{}, {}> {
    renderToCanvas(canvas: HTMLCanvasElement) {
        const triangleImage = new Image();

        function onImageLoaded() {
            const stage = new Stage(canvas);
            const hoverLayer = new Translate();
            const cachedLayer = new LayerCached();

            for (let i = 0; i < 400; i++) {
                // const circle = new Circle({radius: 10, fillStyle: getRandomColor()});
                const image = new IdentifiedImage({width: 20, height: 20, image: triangleImage});
                image.id = i;
                const layer = new Translate({x: (i % 20) * 20, y: Math.floor(i / 20) * 20});
                layer.add(image);
                cachedLayer.add(layer);
            }

            stage.add(cachedLayer);
            stage.add(hoverLayer);
            stage.render();

            stage.on('mousemove', node => {
                hoverLayer.removeAll();
                if (node && node.id) {
                    hoverLayer.x = (node.id % 20) * 20 - 2;
                    hoverLayer.y = Math.floor(node.id / 20) * 20 - 2;
                    hoverLayer.add(new CanvasImage({width: 24, height: 24, image: triangleImage}));
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

