const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        port: 8080,
        static: path.resolve(__dirname, 'src'),
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    context: path.resolve(__dirname, 'src/'),
                    // publicPath: development ? undefined : '../',
                    // name: development ? '[name].[ext]' : '[path][name].[ext]',
                    // limit: 1000,
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
            patterns: [{from: 'src/images', to: 'images'}],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};
