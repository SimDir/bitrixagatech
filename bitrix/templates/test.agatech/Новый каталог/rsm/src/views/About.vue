<style>
  .label{
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid red;
    border-radius: 3px;
  }
  .label.active:before{
    content: 'x';
    position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .input{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  .df{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
  }
</style>
<template>
  <div>
    <h1>This is an home page</h1>
    <h2>Generation form</h2>
    <p>Select inputs:</p>
    <div class="input" v-for="(item, index) in checkbox" :key="item.id">
      <label for="name" class="label" :class="item.active ? 'active' : '' " @click="activeCheck(item.name, index)"></label>
      <span>{{item.text}}</span>
      <input type="checkbox" name="" id="name" style="display: none">
    </div>
    <button @click="generateForm">Сохранить</button>
    <form v-if="generate != null">
      <h3>Сгенерированная форма: </h3>
      <div v-for="item in generate" :key="item.id">
        <div><label :for="item.name">{{item.text}}</label></div>
        <input :type="item.type" :name="item.name" :id="item.name">
      </div>
      <button>Отправить</button>
    </form>
    <div class="df">
      <pre>all: {{checkbox}}</pre>
      <pre>select: {{active}}</pre>
      <pre>generate: {{generate}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      visit: null,
      active: [],
      checkbox: [
        {
          id: 1,
          type: 'text',
          name: 'name',
          text: 'Имя',
          active: false
        },
        {
          id: 2,
          type: 'text',
          name: 'surname',
          text: 'Фамилия',
          active: false
        },
        {
          id: 3,
          type: 'text',
          name: 'firstname',
          text: 'Отчество',
          active: false
        },
        {
          id: 4,
          type: 'password',
          name: 'password',
          text: 'Пароль',
          active: false
        },
      ],
      generate: null
    }
  },
  methods: {
    activeCheck(item, index){
      if(this.active.indexOf(item) < 0){
        this.active.push(item)
      } else if(this.active.indexOf(item) >= 0) {
        this.active.splice(this.active.indexOf(item), 1)
        console.log(this.active.indexOf(item))
      }
      this.checkbox[index].active = !this.checkbox[index].active
    }, 
    generateForm(){
      this.generate = this.checkbox.filter((allCheck)=>{
        return allCheck.active == true
      })
      if (this.generate != null) {
        alert('Форма успешно собрана')
      }
    }
  }

}
</script>
