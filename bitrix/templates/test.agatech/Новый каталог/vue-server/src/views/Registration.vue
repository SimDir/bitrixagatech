<template>
  <div class="auth">
    <h1>Регистрация</h1>
    <form>
      <input type="text" placeholder="E-mail" v-model="mail">
      <input type="password" placeholder="Пароль" v-model="password">
      <button @click.prevent="reg">Отправить</button>
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
    reg() {
      let formData =  new FormData()
      formData.append('mail', this.mail)
      formData.append('password', this.password)
      console.log(this.mail, this.password)
      
      axios
        .post(adr+'/auth/reg.php', formData)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
  }
}
</script>