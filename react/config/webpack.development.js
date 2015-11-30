/* eslint-env node */

import webpack from 'webpack';
import defaultConfig from './webpack.default';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  ...defaultConfig,
  debug: true,
  devtool: 'eval',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
};
