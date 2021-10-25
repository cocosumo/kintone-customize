module.exports = {
  'root': true,
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
    'react',
    'jsdoc',
    '@typescript-eslint',
  ],
  'ignorePatterns': [
    '/dist/*.js',
    '**/vendor/*.js',
    "**/scripts/*",
    "webpack.config.js"
  ],
  rules: {
    'indent': ['error', 2]
  },
};
