var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
  entry: {
      app: './js/index' //编译的入口文件
  },

  output: {
    path: path.join(__dirname,'build'),
    publicPath: '/build',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /^node_modules$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        loader: 'babel-loader'
      },
     {
       test: /\.css$/,
       exclude: /^node_modules$/,
       loader: ExtractTextPlugin.extract("style-loader", "css-loader")
     },
     {
       test: /\.less$/,
       exclude: /^node_modules$/,
       loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
     }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({ //编译成生产版本
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}

module.exports = config;
