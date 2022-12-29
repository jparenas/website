module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/no-v-html': 'off'
  }
}
