import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import client from 'axios'
import toastr from '@/libs/toastr'


require('../node_modules/toastr/build/toastr.css')



Vue.config.productionTip = false
Vue.prototype.$http = client
Vue.prototype.$message = toastr

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
