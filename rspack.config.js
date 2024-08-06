// @ts-check
const path = require('path');

const HtmlRspackPlugin = require('html-rspack-plugin');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// import type { Configuration } from '@rspack/cli';

const isDevelop = process.env.NODE_ENV === 'development';

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './client/index.tsx',
  },
  devServer: {
    port: 4430,
  },
  mode: isDevelop ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDevelop,
                    refresh: isDevelop,
                  },
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    isDevelop && new ReactRefreshPlugin(),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
  output: {
    publicPath: '/',
    chunkLoading: 'jsonp',
    chunkFormat: 'array-push',
    filename: isDevelop ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = config;
