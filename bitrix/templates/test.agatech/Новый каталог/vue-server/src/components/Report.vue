<template>
  <transition name="scale">
    <div class="report" v-if="report.show">
      <h1 @click="reportHide">{{report.name}}</h1>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['report'],
    methods: {
      reportHide(){
        this.report.show = false
        this.$emit('reportHide', false)
      }
    }
  }
</script>
