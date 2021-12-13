const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    customize: './src/app.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts','.tsx','.js', '.json'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/ },
      {
        test: /\.js$/,
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
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ]
};
