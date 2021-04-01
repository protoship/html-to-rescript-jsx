const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].[contenthash].bundle.js',
  },
  mode: 'production',
  plugins: [
    /* new BundleAnalyzerPlugin() */
  ]
};
