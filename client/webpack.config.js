const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    //Added and configured workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      new WebpackPwaManifest({
        name: "PWA Text Editor",
        short_name: "JATE",
        description:
          "An application that allows you to create notes or snippets with or without the internet.",
        background_color: "#01579b",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: path.resolve("src/icons/icon-192x192.png"),
            sizes: [96, 144, 192, 512, 180],
            destination: path.join("icons"),
          },
        ],
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
    ],
    //  Added CSS loaders and babel to webpack.

    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            options: {
              presets: ["@babel/preset-env"],
            },
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
