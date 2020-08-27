/*
 * @Author: your name
 * @Date: 2020-08-14 14:21:19
 * @LastEditTime: 2020-08-27 17:03:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactRouterDom\build\webpack.dev.conf.js
 */
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const styleLoader = process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // output: {
    //     filename: "js/[name].[hash:16].js",//我们开启了hot，那么导出不能使用chunkhash，需要替换为hash。
    // },
    devtool: 'source-map',
    module: {
        rules:
            [
                {
                    test: /\.(less|css)$/,
                    use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
                },
                // 处理图片(file-loader来处理也可以，url-loader更适合图片)
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                      limit: 10000,
                      name: 'static/assets/images/[name].[hash:7].[ext]',
                    },
                },
                // 处理多媒体文件
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    name: 'static/assets/media/[name].[hash:7].[ext]',
                    },
                },
                // 处理字体文件
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/assets/fonts/[name].[hash:7].[ext]'
                    }
                },
            ]
    },
    plugins: [
        //配置环境转换
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        //配置html
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                html5: true
            },
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin(),//热更新
        new MiniCssExtractPlugin()
    ],
    devServer: {
        port: '8081',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: {}
    }
});
