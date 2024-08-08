// @ts-check
const path = require('path');

const rspack = require('@rspack/core');
const HtmlRspackPlugin = require('html-rspack-plugin');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

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
      {
        test: /\.css$/i,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader'],
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    isDevelop && new ReactRefreshPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      minSize: 4096,
    },
  },
  devtool: isDevelop ? 'source-map' : false,
  output: {
    publicPath: '/',
    chunkLoading: 'jsonp',
    chunkFormat: 'array-push',
    filename: isDevelop ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = config;
