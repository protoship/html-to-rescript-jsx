const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = require("./webpack.common.js")
const prodConfig = require("./webpack.prod.js");
const devConfig = require("./webpack.dev.js");

module.exports = (env) => {
  let envConfig = env.production ? prodConfig : devConfig;
  let config = merge(commonConfig, envConfig)

  return merge(config, {
    entry: {
      browserTest: "./src/browserTest.bs.js"
    },
    devServer: {
      index: 'test.html',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Run tests for HTML to ReScript JSX ",
        filename: "test.html",
        template: "src/index.html"
      }),
    ],
  });
};
