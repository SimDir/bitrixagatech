import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuemerang from 'vuemerang'
import 'vuemerang/dist/vuemerang.css' //Vuemerang styles
import 'eva-icons'
import './assets/stylus/style/eva-icons.css'

import XLSX from 'xlsx'

Vue.use(XLSX)
Vue.use(Vuemerang)


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
