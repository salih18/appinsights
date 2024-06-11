module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-prettier'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',
      requireConfigFile: false, // Add this line
    },
    rules: {
      // Add custom rules here
    },
  };
  