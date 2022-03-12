module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        'operator-linebreak': [2, 'none'],
      },
      { usePrettierrc: false },
    ],
  },
};
