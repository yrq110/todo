const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
  entry :
    {
      app: path.resolve(__dirname, 'client/app.js'),
      nej: path.resolve(__dirname, 'client/lib/nej/src/define.js'),
      regular: path.resolve(__dirname, 'client/lib/regular.min.js')
    },
  output : {
    path: path.resolve(__dirname, 'dist'),
    // filename : 'index.html'
    filename : '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["env"],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: 'client/index.html'}),
    new ExtractTextPlugin("index.css"),
  ]
};

module.exports = webpackConfig;