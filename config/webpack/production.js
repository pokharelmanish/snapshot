// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const sharedConfig = require('./shared.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(sharedConfig, {
  output: {filename: '[name]-[chunkhash].js'},
  devtool: 'source-map',
  stats: 'normal',
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        sourceMap: true,

        uglifyOptions: {
          warnings: false,

          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/,
    }),
  ],
})
