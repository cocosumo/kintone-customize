const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    customize: './src/app.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'js'),
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
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
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
};
