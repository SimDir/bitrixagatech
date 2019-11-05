<template>
  <div>
    <h1>Система учета рабочего времени</h1>
    <p>{{visit}}</p>
    <div class="cart">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import adr from '../serverHelper'
export default {
  name: 'home',
  data(){
    return {
      visit: null
    }
  },
  created(){
    this.getVisit()
  },
  methods: {
    getVisit(){
      axios
        .get(adr+'/index.php')
        .then(res => {
          this.visit = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>
