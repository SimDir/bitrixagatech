import firebase from 'firebase/app'

export default {
  state: {
    previews: []
  },
  mutations: {
    setPreview(state, payload){
      state.previews = payload
      console.log(payload)
    },
    pushPreview(state, payload){
      state.previews.unshift(payload)
      console.log(payload)
    }
  },
  actions: {
    setPreview({commit}, payload){
      firebase.database().ref('previews').push(payload)
        .then(()=>{
          commit('pushPreview', payload)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    getPreviews({commit}, payload){
      firebase.database().ref('previews').on('value',(snap)=>{
        console.log(snap.val())
        commit('setPreview', snap.val())
      })
    }
  },
  getters: {
    getPreviews: (state) => state.previews
  }
}