'use strict'

const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionGzip:true,//是否开启gzip压缩
        productionGzipExtensions: ['js', 'css','less'],//配置要压缩的文件的后缀名
        bundleAnalyzerReport: process.env.npm_config_report//通过配置你可以直观看到每个文件有哪些模块被编译进去。
    }
}
