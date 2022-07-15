module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,

  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',

  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  globals: {
    kintone: false,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsdoc',

  ],
  ignorePatterns: [
    '/dist/*.js',
    '**/vendor/*.js',
    '**/scripts/*',
    'webpack.config.js',
    '**/legacy/*',
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.js', '.ts', '.tsx', '.css', '.json'],
      },
    },
  },
};
