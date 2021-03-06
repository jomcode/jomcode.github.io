const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const helpers = require('./helpers');

const METADATA = {
  title: 'TITLE'
};

module.exports = {
  metadata: METADATA,

  entry: {
    polyfills: path.join(helpers.sourceDir, 'polyfills.js'),
    vendor: path.join(helpers.sourceDir, 'vendor.js'),
    main: helpers.mainPath
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'source-map-loader',
        exclude: [
          path.join(helpers.rootDir, 'node_modules', 'rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        include: [
          path.join(helpers.sourceDir, 'vendor.js'),
          path.join(helpers.rootDir, 'node_modules', 'normalize.css')
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),
    // new HtmlWebpackPlugin({
      // template: path.join(helpers.sourceDir, 'index.html'),
      // chunksSortMode: 'dependency'
    // }),
    // new ExtractTextPlugin('[name].[hash].css')
    new ExtractTextPlugin('[name].css')
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  postcss: () => [autoprefixer]
};
