/* eslint-env node */

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {resolve} from 'path';

export default {
  entry: [
    './src/main'
  ],
  output: {
    path: '../static/reactDist',
    filename: 'main.bundle.js'
  },
  resolve: {
    root: [
      resolve(__dirname, '..', 'src')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ['json-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize' +
          '!autoprefixer-loader?browsers=last 2 version' +
          '!sass?' + 'includePaths[]=' + encodeURIComponent(resolve(__dirname, '../src/styles'))
        )
      }
    ]
  }
};
