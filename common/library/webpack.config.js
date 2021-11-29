const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// hello

module.exports = {
  mode: "production",
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],

  entry: {
    index: { import: "./src/index.ts" },
  },

  output: {
    filename: "library.bundle.min.js",
    path: path.resolve(__dirname, "build"),
    library: "yumetetsuLib",
    libraryTarget: "umd",
    clean: true,
  },

  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              }

            },
          },
        ],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader", // https://webpack.js.org/loaders/babel-loader/#root
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
      { test: /\.(ts|tsx)$/, loader: "ts-loader" },
    ],
  },

  optimization: {
    minimizer: [
      new ForkTsCheckerWebpackPlugin(),
      "...",
      new CssMinimizerPlugin(),
    ],
  },
};
