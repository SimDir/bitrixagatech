<template>
  <div class="headerAuth">
    <router-link to="/login" v-if="userData == null">Авторизоваться</router-link>
    <router-link to="/registration" v-if="userData == null">Регистрация</router-link>
    <a v-if="userData != null" :title="'ID Аккаунта: '+userData.uid">{{userData.email}}</a>
    <a v-if="userData != null" class="logout" @click.prevent="logout">Выйти</a>
  </div>
</template>

<script>
export default {
  name: 'HeaderAuth',
  data(){
    return {
      userData: null
    }
  },
  computed: {
    getUserData(){
      return this.$store.getters.getUserData
    }
  },
  watch: {
    getUserData(val){
      this.userData = val
    }
  },
  methods: {
		logout(){
      this.$store.dispatch('logout')
        .then(()=>{
          this.userData = null
          this.$swal({
            html: 'Вы вышли из системы'
          })
        })
        .catch(()=>{
          this.$swal({
            html: 'Произошла ошибка'
          })
        })
		}
  }
}
</script>
