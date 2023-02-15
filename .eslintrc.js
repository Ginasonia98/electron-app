module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['public/**'], optionalDependencies: false, peerDependencies: false },
    ],
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
