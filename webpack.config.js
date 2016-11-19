const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/main.tsx',
    output: {
        filename: './dist/bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.svg']
    },

    module: {
        loaders: [
            {test: /\.svg$/, loader: 'url'},
            {test: /\.png$/, loader: 'url'},
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: 'source-map-loader'}
        ]
    },

    ts: {
        configFileName: 'tsconfig.examples.json'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pure Canvas Examples'
        }),
    ]
};
