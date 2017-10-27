const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: ["webpack-hot-middleware/client", "./src/index.js"],
    output: {
        path: path.resolve (__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/ 
            },
            // {
            //     use: ['css-hot-loader'].concat(ExtractTextPlugin.extract ({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })),
            //     test: /\.css$/
            // },
            {
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract ({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })),
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;