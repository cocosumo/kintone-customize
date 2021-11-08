module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jquery: true
  },
  extends: [
    '@cybozu',
    '@cybozu/eslint-config/presets/react-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  'globals': {
    'kintone': false
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsdoc',

  ],
  'ignorePatterns': [
    '/dist/*.js',
    '**/vendor/*.js',
    '**/scripts/*',
    'webpack.config.js',
    '**/legacy/*'
  ],
  rules: {
    'indent': 'off',
    '@typescript-eslint/indent': ['error'],
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx', '.ts', '.tsx']}]
  },
};
