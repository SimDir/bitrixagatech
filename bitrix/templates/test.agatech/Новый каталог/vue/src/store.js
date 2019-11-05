import Vue from 'vue'
import Vuex from 'vuex'
import general from './store/general'
import preview from './store/preview'
import auth from './store/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    general,
    preview,
    auth
  }
})
