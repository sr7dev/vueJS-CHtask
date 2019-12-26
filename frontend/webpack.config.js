'use strict'
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
  mode: "production",
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunksSortMode: 'dependency'
    })
  ],
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/main.js',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.min.js',
      '@': path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "./img/[hash].[ext]",
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: false, name: "css/[name].[hash:7].[ext]" } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: false, name: "css/[name].[hash:7].[ext]" } },
          { loader: 'sass-loader', options: { sourceMap: false, name: "css/[name].[hash:7].[ext]" } }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: false, name: "css/[name].[hash:7].[ext]" } },
          { loader: 'sass-loader', options: { sourceMap: false, name: "css/[name].[hash:7].[ext]" } }
        ]
      }
    ]
  },


  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 600000,
      maxAsyncRequests: 6,
      maxInitialRequests: 4
    }
  }
}