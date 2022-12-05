const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
    context: __dirname,
    devtool: development && 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'src'),
        liveReload: false,
        open: true,
        port: 8081,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'error',
            overlay: false,
        },
        devMiddleware: {
            writeToDisk: true,
        },
    },
    name: 'client',
    target: 'web',
    entry: './src/index.ts',
    mode: development ? 'development' : 'production',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                ],
                            },
                        },
                    },
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
    performance: {
        hints: false,
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
        new MiniCssExtractPlugin({
            chunkFilename: '[name].css',
            filename: '[name].css',
            ignoreOrder: true,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerWebpackPlugin(),
        ],
    },
};
