import {resolve as _resolve} from 'path';

export const mode = 'development';
export const entry = {
  'customize': './src/app.js',
};
export const output = {
  filename: '[name].js',
  path: _resolve(__dirname, 'dist', 'js'),
};
export const resolve = {
  extensions: ['.js', '.json'],
};
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-react', {
              'runtime': 'automatic',
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
};
