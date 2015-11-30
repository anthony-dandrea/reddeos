/* eslint-env node */

import webpack from 'webpack';
import defaultConfig from './webpack.default';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  ...defaultConfig,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {warnings: false}
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: false
    })
  ]
};
