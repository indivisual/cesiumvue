import Vue from 'vue'
import App from './App'
import info from '../package.json'
import router from './router'
import store from './store/store.js'
import ODS from '@onesait/onesait-ds'
import i18n from './lang/i18n.js'
import 'reset-css/reset.css'
import '@/assets/scss/main.scss'
import '@onesait/onesait-ds/lib/theme-onesait/index.css'
Vue.use(ODS)
// Vue.use(VueCesium, { cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js' })
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
if (process.env.NODE_ENV === 'development') {
  window.odsInfo = {
    'ods-version': ODS.version,
    'project': info.name,
    'author': info.author
  }
}
