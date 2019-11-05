import firebase from 'firebase/app'
export default {
  state: {
    isAuth: false,
    userData: null
  },
  mutations:{
    setUser(state, payload){
      state.isAuth = true
      state.userData = payload
    },
    unsetUser(state){
      state.user = {
        isAuth: false,
        userData: null
      }
    }
  },
  actions: { 
    register({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((responce) => {
        commit('setProcessing', false)
        commit('clearError')
        commit('setUser', responce.user)
      })
      .catch(function(error){
        commit('setProcessing', false)
        commit('setError', error.message)
      })
    },
    login({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((responce) => {
        commit('setProcessing', false)
        commit('clearError')
        commit('setUser', responce.user)
      })
      .catch(function(error){
        commit('setProcessing', false)
        commit('setError', error.message)
      })
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('unsetUser')
    },
    stateChanged({commit}, payload){
      if(payload){
        commit('setUser', payload)
      } else {
        commit('unsetUser')
      }
    }
  },
  getters:{
    isAuth: (state) => state.isAuth,
    getUserData: (state) => state.userData
  }
}