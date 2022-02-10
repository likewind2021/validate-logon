import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// font-awesome
import 'font-awesome/css/font-awesome.css'

// veevalidate
// import './utils/veevalidate'
import './utils/veevalidate-i18n'

import './style/reset.css'

import Alert from './components/modules/alert'

Vue.use(Alert)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
