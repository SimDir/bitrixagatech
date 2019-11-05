<template>
  <div class="header">
    <span class="logo">
      Report.
    </span>
    <nav>
      <router-link 
        class="header-link" 
        v-for="(item, index) in links" 
        :key="index" 
        :to="item.page">
        {{item.name}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return {
      uid: '',
      links: [
        {
          name: 'Главная',
          page: '/'
        },
        {
          name: 'О нас',
          page: '/about'
        },
        {
          name: 'Создать отчет',
          page: '/reports'
        }
      ]
    }
  },
  computed: {
    getUid(){
      return this.$store.getters.getUserData
    }
  },
  watch: {
    getUid(val){
      this.uid = val
    }
  }
}
</script>