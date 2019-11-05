<template>
  <vm-navbar v-model="activeItem" style="background: #fff" class="header">
    <vm-navbar-title>
      RSM
    </vm-navbar-title>
    <vm-navbar-item index="0">
      <router-link to="/">Home</router-link>
    </vm-navbar-item>
    <vm-navbar-item index="1">
      <router-link to="/about">About</router-link>
    </vm-navbar-item>
    <vm-navbar-item index="2">
      <router-link to="/registration">Registration</router-link>
    </vm-navbar-item>
    <vm-spacer></vm-spacer>
    <vm-button @click="activePrompt = true" icon="person-outline" color="primary" type="border" title="Авторизация"></vm-button>
    <vm-prompt
      vm-title="Авторизация"
      vm-accept-text="Войти"
      vm-cancel-text="Отмена"
      @vm-accept="acceptAlert"
      :vm-active.sync="activePrompt">
       <div class="con-exemple-prompt">
          <div class="centerx labelx">
            <vm-input icon="person-outline" label="Логин" v-model="login"/>
            <vm-input icon="lock-outline" type="password" label="Пароль" v-model="pass"/>
          </div>
       </div>
     </vm-prompt>
  </vm-navbar>
</template>
<script>
export default {
  data:()=>({
    activePrompt: false,
    login: '',
    pass: '',
    activeItem: 0,
    search: ''
  }),
  methods: {
    acceptAlert(){
       this.$vm.notify({
        position:'bottom-left',
        icon: '',
        color:'success',
        title: 'Авторизация',
        text:'Авторизация прошла успешно'
      })
    }
  }
}
</script>


<style lang="stylus">
.con-exemple-prompt
  padding 10px;
  padding-bottom 0px
  .vm-input
    width 100%
    margin-top 10px

// .con-vm-dialog .vm-dialog footer button
//   margin 11px 5px !important
</style>