const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8888 : 9999 // Prevents build errors when running --modern
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        moment$: 'moment/moment.js'
      }
    }
  },
  chainWebpack: config => {
    if (config.plugins.store.get('prefetch')) {
      config
        .plugin('prefetch')
        .tap(args => {
          args[0].fileBlacklist = [
            /\.map$/,
            /pdfmake\.[^.]+\.js$/,
            /xlsx\.[^.]+\.js$/,
            /fabric[^.]*\.[^.]+\.js$/,
            /responsivedefaults\.[^.]+\.js$/
          ]
          return args
        })
    }
  }
}