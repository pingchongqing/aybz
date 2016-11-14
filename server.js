var express = require('express');
var bzcls = require('./routes/bzcls');
var article = require('./routes/article');
var path = require('path');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.config');


var app = express();
//启动服务的时候 打包并监听客户端用到的文件，webpackDevMiddleware是开发模式，他会打包js在内存里面,你改了
app.use(webpackDevMiddleware(webpack({
    entry: "./js/index.js",
    output: {
        path: "/"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /^node_modules$/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.js$/,
          exclude: /^node_modules$/,
          loaders: ['react-hot', 'babel']
        },
       {
         test: /\.css$/,
         exclude: /^node_modules$/,
         loaders:["style-loader", "css-loader"]
       },
       {
         test: /\.less$/,
         exclude: /^node_modules$/,
         loaders:['style-loader', 'css-loader', 'less-loader']
       }
      ]
    }
}), {
    noInfo: false,
    quiet: false,
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: "/build/",
    headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    }
}));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/bzcls', bzcls);
app.use('/article', article);



app.listen(3008,function(){
  console.log('port 3008 is working');
});
