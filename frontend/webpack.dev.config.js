const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const globImporter = require('node-sass-glob-importer')
const merge = require('webpack-merge')
const common = require('./webpack.dev.common.js')

const client = merge(common, {
  name: 'client',
  mode: 'development',
  target: 'web',
  entry: [
    path.resolve(__dirname, 'src/client.js'),
    'webpack-hot-middleware/client',
  ],
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
})

const server = merge(common, {
  name: 'server',
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    m: path.resolve(__dirname, 'src/server/ssr.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
})

module.exports = [client, server]