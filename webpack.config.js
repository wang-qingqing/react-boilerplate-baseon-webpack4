const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.NODE_ENV;
const path = require('path');  
const glob = require('glob');

// 获取入口文件
// var entries = (function() {
//     var jsDir = path.resolve(__dirname, 'src/static/js/services');
//     var entryFiles = glob.sync(jsDir + '/*.js');
//     var map = {};

//     entryFiles.forEach(function(filePath) {
//         var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
//         map[filename] = filePath;
//     });
//     return map;
// })();

//页面的设置
// var htmlPages = (function() {
// 	var artDir = path.resolve(__dirname, 'src/views');
// 	var artFiles = glob.sync(artDir + '/*.art');
// 	var array = [];

// 	artFiles.forEach(function(filePath) {
// 		var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));

// 		array.push(new HtmlWebpackPlugin({
// 			template: path.resolve(__dirname, 'src/template/index.html'),
// 			filename: filename + '.html',
// 			chunks: ['vendor', 'main', filename],
// 			chunksSortMode: function(chunk1, chunk2) {
// 				var order =  ['vendor', 'main', filename];
// 				var order1 = order.indexOf(chunk1.names[0]);
// 				var order2 = order.indexOf(chunk2.names[0]);
// 				return order1 - order2;
// 			},
// 			minify: {
// 				removeComments: env === 'production' ? true : false,
// 				collapseWhitespace: env === 'production' ? true : false
// 			}
// 		}));
// 	});
// 	return array;
// })();

module.exports = {
    entry: {
        index: './src/index.js',
        entry: './src/entry.js',
    },
    //entry: entries(),//多入口可以如此设置，单入口则可省略（默认是/src/index.js）
    output: {
        //publicPath: '/', //表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename:'[name]-[hash].js'
    },
    devtool: env === 'production' ? false : 'cheap-module-eval-source-map',
    devServer:{
        historyApiFallback: true,  //可以查看页面的报错信息,并且所有路径都会执行index.html
        compress: true // 开发服务器是否启动gzip等压缩
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets: [
                            'react',
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 7", "iOS >= 8"]
                                }
                            }],
                            'stage-1'                  
                        ],
                        "plugins": [
                            "transform-decorators-legacy",
                            "transform-decorators"                
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                {
                    loader: "html-loader",
                    options: { 
                        minimize: true                   
                    }
                }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }, 
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), //在打包前清空 dist 目录
        new HtmlWebPackPlugin({
            template: "./src/views/index.html",
            filename: "./index.html", // 生成的html存放路径，相对于 path
            hash: true // 为静态资源生成hash值
        }),
        new HtmlWebPackPlugin({
            template: "./src/views/entry.html",
            filename: "./entry.html", // 生成的html存放路径，相对于 path
            hash: true // 为静态资源生成hash值
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].[chunkhash:8].css"
        })     
    ],
    watch: env === 'development',
    watchOptions: {
        ignored: /node_modules/, // 忽略不用监听变更的目录
        aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫秒内重复保存不打包
        poll: 1000 // 每秒询问的文件变更的次数
    },
    resolve: {
        alias: {
            Mock: path.resolve(__dirname, 'mock'),
            Components: path.resolve(__dirname, 'src/components'),
            Helper: path.resolve(__dirname, 'src/helper'),
            Routes: path.resolve(__dirname,'src/routes'),
            Store: path.resolve(__dirname,'src/store'),
            Style: path.resolve(__dirname, 'src/style')
        }
    }
};
