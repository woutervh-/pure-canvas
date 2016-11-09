"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var Stage_1 = require('../src/Stage');
var Circle_1 = require('../src/Circle');
var Image_1 = require('../src/Image');
var Line_1 = require('../src/Line');
var Rectangle_1 = require('../src/Rectangle');
var Translate_1 = require('../src/Translate');
var Scale_1 = require('../src/Scale');
var colors_1 = require('./colors');
var triangle = require('./triangle.svg');
var LayerCached_1 = require('../src/LayerCached');
function getRandomColor() {
    return colors_1.default[Math.floor(Math.random() * colors_1.default.length)];
}
var IdentifiedImage = (function (_super) {
    __extends(IdentifiedImage, _super);
    function IdentifiedImage() {
        _super.apply(this, arguments);
        this.type = 'image';
    }
    return IdentifiedImage;
}(Image_1.default));
var IdentifiedCircle = (function (_super) {
    __extends(IdentifiedCircle, _super);
    function IdentifiedCircle() {
        _super.apply(this, arguments);
        this.type = 'circle';
    }
    return IdentifiedCircle;
}(Circle_1.default));
var IdentifiedLine = (function (_super) {
    __extends(IdentifiedLine, _super);
    function IdentifiedLine() {
        _super.apply(this, arguments);
        this.type = 'line';
    }
    return IdentifiedLine;
}(Line_1.default));
var IdentifiedRectangle = (function (_super) {
    __extends(IdentifiedRectangle, _super);
    function IdentifiedRectangle() {
        _super.apply(this, arguments);
        this.type = 'rectangle';
    }
    return IdentifiedRectangle;
}(Rectangle_1.default));
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.renderToCanvas = function (canvas) {
        var triangleImage = new Image();
        function onImageLoaded() {
            var stage = new Stage_1.default(canvas);
            var hoverLayer = new Translate_1.default();
            var scaledHoverLayer = new Scale_1.default({ x: 2, y: 2 });
            var scaledLayer = new Scale_1.default({ x: 2, y: 2 });
            var cachedLayer = new LayerCached_1.default();
            var hoverImage = new Image_1.default({ width: 24, height: 24, image: triangleImage });
            var hoverCircle = new Circle_1.default({ radius: 10, fillStyle: 'white' });
            var hoverLine = new Line_1.default({ x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 5 });
            var hoverRectangle = new IdentifiedRectangle({ x1: 0, y1: 0, x2: 8, y2: 8, strokeStyle: 'red' });
            hoverImage.setHitEnabled(false);
            hoverCircle.setHitEnabled(false);
            hoverLine.setHitEnabled(false);
            hoverRectangle.setHitEnabled(false);
            for (var i = 0; i < 400; i++) {
                var image = new IdentifiedImage({ width: 20, height: 20, image: triangleImage });
                var circle = new IdentifiedCircle({ radius: 8, fillStyle: getRandomColor() });
                var line = new IdentifiedLine({ x1: 0, y1: 0, x2: 15, y2: 15, lineWidth: 3 });
                var rectangle = new IdentifiedRectangle({ x1: 0, y1: 0, x2: 8, y2: 8 });
                image.id = i;
                circle.id = i;
                line.id = i;
                rectangle.id = i;
                var layer = new Translate_1.default({ x: (i % 20) * 20, y: Math.floor(i / 20) * 20 });
                layer.add(image);
                layer.add(circle);
                layer.add(line);
                layer.add(rectangle);
                scaledLayer.add(layer);
            }
            scaledHoverLayer.add(hoverLayer);
            cachedLayer.add(scaledLayer);
            stage.add(cachedLayer);
            stage.add(scaledHoverLayer);
            stage.render();
            stage.on('mousemove', function (node) {
                hoverLayer.removeAll();
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
        }
        else {
            triangleImage.onload = onImageLoaded;
        }
    };
    App.prototype.render = function () {
        var _this = this;
        return React.createElement("canvas", {width: 400, height: 400, ref: function (r) { return _this.renderToCanvas(r); }}, "Your browser does not support the HTML5 canvas tag.");
    };
    return App;
}(React.Component));
var container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(React.createElement(App, null), container);
//# sourceMappingURL=main.js.map