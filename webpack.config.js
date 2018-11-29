const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, "./src/index.js")
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js"
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: [path.join(__dirname, "./node_modules")]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: path.resolve(__dirname, "src/index.js"),
        use: "shebang-loader",
        exclude: [path.join(__dirname, "./node_modules")]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ],
  mode: "production"
};
