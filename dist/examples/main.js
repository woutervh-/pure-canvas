"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var Stage_1 = require('../src/Stage');
var Image_1 = require('../src/Image');
var Translate_1 = require('../src/Translate');
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
    }
    return IdentifiedImage;
}(Image_1.default));
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
            var cachedLayer = new LayerCached_1.default();
            for (var i = 0; i < 400; i++) {
                // const circle = new Circle({radius: 10, fillStyle: getRandomColor()});
                var image = new IdentifiedImage({ width: 20, height: 20, image: triangleImage });
                image.id = i;
                var layer = new Translate_1.default({ x: (i % 20) * 20, y: Math.floor(i / 20) * 20 });
                layer.add(image);
                cachedLayer.add(layer);
            }
            stage.add(cachedLayer);
            stage.add(hoverLayer);
            stage.render();
            stage.on('mousemove', function (node) {
                hoverLayer.removeAll();
                if (node && node.id) {
                    hoverLayer.x = (node.id % 20) * 20 - 2;
                    hoverLayer.y = Math.floor(node.id / 20) * 20 - 2;
                    hoverLayer.add(new Image_1.default({ width: 24, height: 24, image: triangleImage }));
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