
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
  entry: {
    'customize': './src/index.tsx',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', 'jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
        ],
    },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
