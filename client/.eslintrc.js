module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
    // "eslint:recommended",
    // "plugin:vue/recommended",
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: { 'no-console': 'off' }
}
