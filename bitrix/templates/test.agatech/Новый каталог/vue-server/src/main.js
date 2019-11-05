import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const option = {
  position: 'top-end',
  showCancelButton: false,
  showConfirmButton: false,
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  background: '#EFF6F6',
  timer: 1500,
  animation: true,
  customClass: {
    popup: 'swal2-custom-class'
  },
  scrollbarPadding: false
  // confirmButtonText: 'Yes, delete it!',
  // cancelButtonText: 'No, keep it'
}
Vue.use(VueSweetalert2, option)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
