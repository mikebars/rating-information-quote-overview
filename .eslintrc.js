/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * @type {ESLintConfig}
 */
const eslintConfig = {
  env: {
    browser: true,
    commonjs: true,
    es2017: true,
    es2020: true,
    es6: true,
    jest: true,
    node: true,
    'shared-node-browser': true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest/all',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint/tslint', 'jest', 'jest-extended', 'prettier'],
  root: true,
  rules: {
    '@typescript-eslint/tslint/config': [
      'warn',
      {
        lintFile: './tslint.json',
      },
    ],
    'prettier/prettier': 'error',
  },
}

module.exports = eslintConfig
