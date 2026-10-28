module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['react-hooks'],
  rules: {
    'no-console': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'warn',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      env: { jest: true },
    },
  ],
};
