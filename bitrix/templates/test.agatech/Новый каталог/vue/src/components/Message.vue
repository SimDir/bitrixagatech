<template>
  <transition name="taskList">
    <div v-if="message.show" class="message">
      {{timeStart()}}
      <p>{{message.ask}}</p>
      <button 
        class="successBtn" 
        @click="successBtn" 
        v-if="message.successBtnText != ''">{{message.successBtnText}}</button>
      <button 
        class="cancelBtn" 
        @click="cancelBtn" 
        v-if="message.cancelBtnText != ''">{{message.cancelBtnText}}</button>
      <button 
        @click="cancelBtn" 
        class="close-btn">&times;</button>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['message'],
    data(){
      return {
        timer: this.message.timer ? this.message.timer : false,
        timerStart: this.message.timerStart ? this.message.timerStart : false
      }
    },
    methods:{
      cancelBtn(){
        this.$emit('response', {
          id: this.message.id,
          response: false
        })
      },
      successBtn(){
        this.$emit('response', {
          id: this.message.id,
          response: true
        })
      },
      timeStart(){
        if(this.timer != false){
          setTimeout(()=>{
            this.$emit('response', {
              id: this.message.id,
              response: false
            })
          }, this.timer)
        }
      }
    }
  }
</script>