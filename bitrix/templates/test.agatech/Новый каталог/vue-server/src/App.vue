<template>
  <div id="app">
    <Header/>
    <HeaderAuth/>
    <router-view class="page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import HeaderAuth from '@/components/HeaderAuth.vue'
import axios from 'axios'
import adr from './serverHelper'

export default {
  data(){
    return{
      auth: null,
    }
  },
  created(){
    this.checkAuth()
  },
  methods:{
    checkAuth(){
      axios
        .get(adr+'/auth/checkAuth.php')
        .then(res => {
          this.auth = res.data
          console.log(this.auth)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    Header,
    HeaderAuth
  }
}
</script>
<style lang="stylus">
@import './assets/stylus/main.styl'
</style>
