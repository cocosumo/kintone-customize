module.exports = {
  'root': true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    '@cybozu/eslint-config/presets/kintone-customize-es5',
    '@cybozu',
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
    '@typescript-eslint',
  ],
  rules: {
    'indent': ['error', 2]
  },
};
