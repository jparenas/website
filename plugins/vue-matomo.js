import Vue from 'vue'
import VueMatomo from 'vue-matomo'

export default ({ app }) => {
  Vue.use(VueMatomo, {
    router: app.router,
    host: 'https://analytics.jparenas.com',
    siteId: 1,
    disableCookies: true
  })
}
