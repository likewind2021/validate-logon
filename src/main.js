import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// font-awesome
import 'font-awesome/css/font-awesome.css'

// veevalidate
import './util/veevalidate'

import './style/reset.css'
Vue.config.productionTip = false

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'http://localhost:8080/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
