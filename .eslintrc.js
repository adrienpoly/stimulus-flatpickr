module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  plugins: ['mocha'],
  extends: ['plugin:mocha/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-unused-expressions': 'off',
    'mocha/no-setup-in-describe': 'off',
    'mocha/no-top-level-hooks': 'off',
    'mocha/no-hooks-for-single-case': 'off'
  }
}
