import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC4ojRQkda_-VU48jAsGIuG-zmxyzUwyr0",
  authDomain: "previewagatech.firebaseapp.com",
  databaseURL: "https://previewagatech.firebaseio.com",
  projectId: "previewagatech",
  storageBucket: "previewagatech.appspot.com",
  messagingSenderId: "245407340320",
  appId: "1:245407340320:web:ff99d521cee36b8cbde945",
  measurementId: "G-YQ955F842B"
  // storageBucket: 'gs://imma-d581b.appspot.com'
})
export const db = firebaseApp.firestore()


const option = {
  position: 'top-end',
  showCancelButton: false,
  showConfirmButton: false,
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  background: '#EFF6F6',
  timer: 1500,
  animation: false,
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
  render: h => h(App),
  created(){
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        store.dispatch('stateChanged', user)
      }
    })
  }
}).$mount('#app')
