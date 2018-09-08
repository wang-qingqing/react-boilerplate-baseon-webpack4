const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.NODE_ENV;
const path = require('path');  
const glob = require('glob');
const htmlPathPrefix = './src/pages';//html放置的路径前缀

// 获取指定路径下的入口文件
function getEntries(globPath) {
    let files = glob.sync(globPath),//同步获取指定文件
        entries = {};

    files.forEach(function(filePath) { 
        // 取倒数第二层(pages下面的文件夹)做包名
        if(filePath.match(/\.js$/)){
            let split = filePath.split('/');
            let fileName = split[split.length - 1];
            let name = fileName.substring(0, fileName.length - 3);
            entries[name] = './' + filePath;
        }
    });

    return entries;
}

//页面的设置
var htmlPages = (function () {
    let files = glob.sync(htmlPathPrefix + '/*.html'),
        configArray = [];

    files.forEach(function(filePath) {
        if(filePath.match(/\.html$/)){
            let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            configArray.push(new HtmlWebPackPlugin({
                template: htmlPathPrefix + "/" +filename + ".html",
                filename: filename + '.html', // 生成的html存放路径，相对于 path
                hash: true, // 为静态资源生成hash值
                chunks: [filename], //添加引入的js,也就是entry中的key
                title: filename // 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用
            }))
        }
    });

    return configArray;  
})();

module.exports = {
    entry: getEntries(htmlPathPrefix + '/*.js'),//多入口可以如此设置，单入口则可省略（默认是/src/index.js）
    output: {
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

        ...htmlPages,//html页面
       
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
            Pages: path.resolve(__dirname, 'src/pages'),       
            Routes: path.resolve(__dirname,'src/routes'),
            Store: path.resolve(__dirname,'src/store'),
            Style: path.resolve(__dirname, 'src/style')
        }
    }
};
