'use strict';
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: "development",
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: path.resolve('./src/index.ts'),
  output: {
    path: path.resolve('./dist/'),
    publicPath: '/dist/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  externals: {
    'vue': {
      umd: 'Vue',
      global: 'Vue',
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue'
    },
    'vuetify': {
      umd: 'Vuetify',
      global: 'Vuetify',
      root: 'Vuetify',
      commonjs2: 'vuetify',
      commonjs: 'vuetify',
      amd: 'vuetify'
    },
    'buttplug': {
      umd: 'Buttplug',
      global: 'Buttplug',
      root: 'Buttplug',
      commonjs2: 'buttplug',
      commonjs: 'buttplug',
      amd: 'buttplug'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|tests|example/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.vue$/,
        use: [{
          loader:'vue-loader',
          options: {
            loaders: {
              esModule: true
            }
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      'vue$': path.resolve('./node_modules/vue/dist/vue.esm.js'),
      'vuetify$': path.resolve('./node_modules/vuetify/dist/vuetify.js'),
      'buttplug$': path.resolve('./node_modules/buttplug/dist/main/src/index.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
    }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
    }),
  ],
  node: {
    fs: 'empty'
  }
};
