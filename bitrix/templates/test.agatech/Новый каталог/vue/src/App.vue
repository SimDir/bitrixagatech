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
