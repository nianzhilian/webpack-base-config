/*
 * @Author: your name
 * @Date: 2020-08-14 14:21:19
 * @LastEditTime: 2020-08-26 15:11:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactRouterDom\build\webpack.base.conf.js
 */
const path = require('path');
const config=require('../config');
const APP_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
module.exports = {
    entry: {
        app: './src/index.jsx',
        framework:['react','react-dom']//不变的代码分开打包
    },    
    output: {
        // filename: 'js/bundle.js',
        // path: DIST_PATH
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                              "@babel/preset-env",
                              // {
                              //   "targets": {
                              //     "browsers": ["ie >= 8"]
                              //   },
                              //   "useBuiltIns": "usage",
                              //   "corejs": "3"
                              // }
                            ]
                          ],
                        cacheDirectory: true,
						plugins: [
                            // ['@babel/plugin-transform-modules-commonjs'],// 笔者为了兼容IE8才用了这个插件，代价是不能tree shaking
                            // 没有IE8兼容需求的同学可以把这个插件去掉
                            [
                                '@babel/plugin-transform-runtime'
                              ],
                            ['@babel/plugin-transform-object-assign']
						]
					}
                },
                exclude: /(node_modules|bower_components)/,
                include: APP_PATH
            }
        ]
    }
};
