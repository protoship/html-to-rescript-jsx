module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  /* 
  https://github.com/reworkcss/css uses both fs and path modules, which is not 
  available in the browser. But we only use its parse function, which does not 
  require either of these libraries. 
  */
  resolve: {
    fallback: { path: require.resolve("path-browserify"), fs: false },
  },
};
