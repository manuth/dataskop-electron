/**
 * Builds the DLL for development electron renderer process
 */

import Dotenv from 'dotenv-webpack';
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { dependencies } from '../../package.json';
import CheckNodeEnv from '../scripts/CheckNodeEnv';
import baseConfig from './webpack.config.base';

CheckNodeEnv('development');

const dist = path.join(__dirname, '../dll');

export default merge(baseConfig, {
  context: path.join(__dirname, '../..'),

  devtool: 'eval',

  mode: 'development',

  target: 'electron-renderer',

  externals: ['fsevents', 'crypto-browserify'],

  /**
   * Use `module` from `webpack.config.renderer.dev.js`
   */
  module: require('./webpack.config.renderer.dev.babel').default.module,

  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  output: {
    library: 'renderer',
    path: dist,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    // read .env files
    new Dotenv(),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.join(__dirname, '../../src'),
        output: {
          path: path.join(__dirname, '../dll'),
        },
      },
    }),
  ],
});
