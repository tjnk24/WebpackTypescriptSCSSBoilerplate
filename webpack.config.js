const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    devServer: {
        port: 8080,
        static: path.resolve(__dirname, 'src'),
        devMiddleware: {
            writeToDisk: true,
        },
    },
    mode: development ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'ts-loader'},
                ],
            },
            {
                test:/\.scss$/,
                use: [
                    {loader: development ? 'style-loader' : MiniCssExtractPlugin.loader},
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/images', to: 'images'},
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};
