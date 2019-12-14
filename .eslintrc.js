const rules = {
  'linebreak-style': ['error', 'unix'],
  'import/no-extraneous-dependencies': 0,
  'object-curly-newline': ['error', {
    consistent: true
  }],
  'comma-dangle': ['error', 'always-multiline'],
  'arrow-parens': ['error', 'as-needed', {
    requireForBlockBody: false
  }],
  'import/no-extraneous-dependencies': 0,
  'newline-per-chained-call': 0,
};

const config = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules,
};
export default config;
