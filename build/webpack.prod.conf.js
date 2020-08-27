const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const config = require("../config");
const utils = require("./utils");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //编译模板文件在模板里自动添加js
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理dist目录
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); //压缩js
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //导出css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const styleLoader = process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        // filename: "js/[name].[chunkhash:16].js",
        path: config.build.assetsRoot,
        filename: utils.assetsPath("js/[name].[chunkhash:16].js"),
        chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            // 处理图片(file-loader来处理也可以，url-loader更适合图片)
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
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
            }
        ],
    },
    plugins: [
        require("autoprefixer"),
        //配置环境转换
        new webpack.DefinePlugin({
            "process.env": require("../config/prod.env"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            inject: "body",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
        //拷贝目录
        new CopyWebpackPlugin({
            patterns: [
                {from: path.join(__dirname, '../public/libs'),to: path.join(__dirname, '../dist/libs')}
            ],
        }),
        // new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
        // new CleanWebpackPlugin([config.build.assetsRoot], { allowExternal: true }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].[hash].css',
        //     chunkFilename: 'css/[id].[hash].css',
        // }),//导出样式
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("assets/css/[name].[hash].css"),
            chunkFilename: utils.assetsPath("assets/css/[id].[hash].css"),
        }),
        // 清除无用 css
        // new PurifyCSS({
        //     paths: glob.sync([
        //     // 要做 CSS Tree Shaking 的路径文件
        //     path.resolve(__dirname, './src/*.html'), 
        //     // 请注意，我们同样需要对 html 文件进行 tree shaking
        //     path.resolve(__dirname, './src/*.js')
        //     ])
        // })
    ],
    //webpack3版本是通过配置CommonsChunkPlugin插件来抽离公共的模块
    //webpack4改用配置optimization.splitChunks的方式，  可以被浏览器缓存
    optimization: {
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true,
                },
                vendor: {
                    priority: 10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                    reuseExistingChunk: true,
                },
                react: {
                    test({ resource }) {
                        return /[\\/]node_modules[\\/](react|redux)/.test(resource);
                    },
                    name: "react",
                    priority: 20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new UglifyJSPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true
                    ? {
                        map: { inline: false },
                    }
                    : {},
                sourceMap: true
            }),
        ],
    },
});

//添加gzip压缩插件
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require("compression-webpack-plugin");

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
                "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240,
            minRatio: 0.8,
        })
    );
}

//查看每个文件有哪些模块被编译进去。
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin(
        {
         analyzerMode: 'static', // html 文件方式输出编译分析
         openAnalyzer: false,
         reportFilename: path.resolve(__dirname, '..', `analyzer/index.html`),
        }
    ));
}

module.exports = webpackConfig;
