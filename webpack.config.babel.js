import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
    entry: ["webpack-hot-middleware/client", "./src/index.js"],
    output: {
        path: path.resolve (__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/ 
            },
            {
                use: ExtractTextPlugin.extract ({
                    use: 'css-loader'
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin ('style.css'),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;