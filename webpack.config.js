// @ts-check

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const generateConfig = (env, argv) => {
  const outputPath = path.resolve(__dirname, "dist");
  const isDev = argv.mode === "development";

  /** @type webpack.Configuration */
  const config = {
    output: {
      path: outputPath,
      filename: isDev ? "[name].js" : "[name].[hash].js"
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      new CleanWebpackPlugin(outputPath),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ],
    devtool: isDev ? "eval-source-map" : "source-map"
  };

  return config;
}

module.exports = generateConfig;
