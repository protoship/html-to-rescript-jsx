const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devtool: 'eval-source-map'
};
