import colors from 'vuetify/es5/util/colors'

const dev = process.env.NODE_ENV !== 'production'

const plugins = []

if (!dev) {
  plugins.push({ src: '~/plugins/vue-matomo.js', ssr: false })
}

export default {
  target: 'static',
  telemetry: false,

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: 'Juan Pablo Arenas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/scrollactive.js',
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    ...plugins
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/sitemap',
    'nuxt-webfontloader'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Muli'
      }
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  sitemap: {
    hostname: 'https://jparenas.com'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    publicPath: dev ? '/_nuxt/' : '/public/',
    babel: {
      presets ({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  optimizedImages: {
    optimizeImages: true
  },

  webfontloader: {
    google: {
      families: ['Muli:300,400&display=swap']
    }
  }
}
