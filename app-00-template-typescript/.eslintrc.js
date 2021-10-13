module.exports = {
  'root': true,
  env: {
    browser: true,
    es2020: true,
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
    '@typescript-eslint',
  ],
  'ignorePatterns': ['/dist/*.js', '**/vendor/*.js'],
  rules: {
    'indent': ['error', 2]
  },
};
