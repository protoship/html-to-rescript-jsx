const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].[contenthash].bundle.js',
  },
  mode: 'production',
};
