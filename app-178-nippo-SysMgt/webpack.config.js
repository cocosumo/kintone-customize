const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ],

  entry: {
    customize: './src/app.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'js'),
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader', // https://webpack.js.org/loaders/babel-loader/#root
          options: {
            presets: [
              ['@babel/preset-react', {
                runtime: 'automatic',
              }],
            ],

          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
    ],
  },
  optimization: {
    minimizer: [
      new ForkTsCheckerWebpackPlugin(),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
