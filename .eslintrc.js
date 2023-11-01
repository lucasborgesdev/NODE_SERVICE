/* eslint-disable quotes */

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    camelcase: 'off',
    curly: 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'linebreak-style': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'nonblock-statement-body-position': 'off',
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': [
      'error',
      { exceptions: ['**/src/index.ts'] },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', ts: 'never' },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
