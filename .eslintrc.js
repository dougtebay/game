module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 100 }],
    'no-dupe-class-members': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['element'] }],
    'no-unused-expressions': ['error', { 'allowTernary': true }],
    semi: ['error', 'always'],
  },
};
