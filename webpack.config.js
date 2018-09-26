const path = require("path");
const webpack = require('webpack')

const entry =
  process.env.NODE_ENV === "production"
    ? {
        intro: ["./client/intro.js"],
      }
    : {
        intro: ["./client/intro.js", "webpack-hot-middleware/client"],
      };

module.exports = {
  mode: "development",
  devServer: {
    stats: "errors-only"
  },
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  resolve: {
    alias: {
      assets: path.join(__dirname, "dist")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /client/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/stage-3", "@babel/react"],
            plugins: ["react-hot-loader/babel"]
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};