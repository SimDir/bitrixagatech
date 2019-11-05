<template>
  <div class="auth">
    <h1>Авторизация</h1>
    <form>
      <input type="text" placeholder="E-mail" v-model="mail">
      <input type="password" placeholder="Пароль" v-model="password">
      <button @click.prevent="auth">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import adr from '../serverHelper'
export default {
  data(){
    return{
      mail: '',
      password: ''
    }
  },
  methods: {
    auth() {
      let formData =  new FormData()
      formData.append('mail', this.mail)
      formData.append('password', this.password)
      
      axios
        .post(adr+'/auth/auth.php', formData)
        .then(response => {
          this.$swal({
              text: response.data
          })
          console.log(response.data)
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
  }
}
</script>