module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jquery: true,
    jest: true
  },
  extends: [
    'plugin:import/recommended',
    '@cybozu',
    '@cybozu/eslint-config/presets/react-typescript',
    'plugin:@typescript-eslint/recommended',
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
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx', '.ts', '.tsx']}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'linebreak-style': 'off',

  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.js', '.ts', '.tsx', '.css', '.json'],
      },
    },
  }
};
