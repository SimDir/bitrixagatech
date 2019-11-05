import axios from 'axios'
import adr from '../serverHelper'

export default {
  state: {
    reports: []
  },
  mutations:{
    setReports(state, payload){
      state.reports = payload
    }
  },
  actions: { 
    getReports({commit}){
      axios
        .get(adr+'/reports/getReports.php')
        .then(res => {
          const reports = res.data
          commit('setReports', reports)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters:{
    getReportsList: (state) => state.reports
  }
}