const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const commonConfig = require("./webpack.common.js")
const prodConfig = require("./webpack.prod.js");
const devConfig = require("./webpack.dev.js");

module.exports = (env) => {
  let envConfig = env.production ? prodConfig : devConfig;
  let config = merge(commonConfig, envConfig)

  return merge(config, {
    entry: {
      index: "./src/index.bs.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Convert HTML to ReScript JSX ",
        filename: "index.html",
        template: "src/index.html",
      }),
      new HtmlWebpackTagsPlugin({
        tags: ["reset.css", "index.css"],
        append: true,
      }),
    ],
  });
};
