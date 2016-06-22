const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  debug: false,
  devtool: 'source-map',
  output: {
    path: helpers.outputDir,
    // filename: '[name].[hash].js',
    // sourceMapFilename: '[name].[hash].map',
    // chunkFilename: '[name].[id].chunk.js'
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new CleanWebpackPlugin([helpers.outputDir + '/**/*.*'], {
      verbose: true,
      root: helpers.rootDir
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
