<template>
  <div>
    <Message :message="message" @response="response"/>
    <Report :report="report" @reportHide="reportHide"/>
    <h1>Создать отчет</h1>
    <div class="add-report-wrap">
      <input 
        type="text"  
        v-model="nameReport"
        class="add-report-input"
        placeholder="Введите название"
        :class="{ active: isActive }">
      <button 
        class="add-report-btn" 
        v-if="!isActive" 
        @click="isActive = !isActive">+</button>
      <button 
        class="add-report-btn" 
        v-if="isActive" 
        style="transform: translateX(-100%)"
        @click="addReportFunc()">+</button>
    </div>
    <transition-group 
      name="taskList" 
      tag="ul" 
      class="report-list"
      :class="{active: reportShow != null}">
      <li 
        :style="'background: '+ item.color"
        class="report-item"
        v-for="(item, index) in addReport"
        :key="index"
        :class="{active: reportShow == item.id}">
        <div class="item-icon-wrap">
          <button 
            class="item-icon" 
            title="Открыть отчет" 
            @click="editReport(item.id, item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
          <button 
            class="item-icon" 
            title="Удалить отчет" 
            @click="deleteReport(item.id)">&times;</button>
        </div>
        <h2 class="item-name">{{item.title}}</h2>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import Message from '@/components/Message.vue'
  import Report from '@/components/Report.vue'
  export default {
    name: 'report',
    components:{
      Message,
      Report
    },
    data(){
      return {
        userData: null,
        id: 0,
        report: {},
        addReport: [],
        nameReport: '',
        isActive: false,
        message: {
          show: false,
          ask: '',
          successBtnText: '',
          cancelBtnText: ''
        },
        reportShow: null,
      }
    },
    computed: {
      getUserData(){
        return this.$store.getters.getUserData
      },
      getPreviews(){
        return this.$store.getters.getPreviews
      }
    },
    watch: {
      getUserData(val){
        this.userData = val
        this.$store.dispatch('getPreviews')
      },
      getPreviews(val){
        this.addReport = []
        this.addReport = val
        console.log(this.id)
      }
    },
    methods: {
      editReport(id, item){
        if(this.reportShow != id){
          this.reportShow = id
          this.report = item
          this.report['show'] = true
        }else{
          this.reportShow = null
        }
      },
      reportHide(){
        this.reportShow = null
        this.report = {}
      },
      addReportFunc(){
        // this.id = this.id + 1
        const created_at = new Date()
        this.$store.dispatch('setPreview', {
          uid: this.userData.uid,
          id: this.id,
          title: this.nameReport
        })
        .then(()=>{
          this.$swal({
            html: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><circle style="fill:#25AE88;" cx="25" cy="25" r="25"/><polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="38,15 22,33 12,25 "/></svg> Данные успешно сохранены'
          })
        })
        .catch((err)=>{
          this.$swal({
            html: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;" xml:space="preserve"><g><path style="fill:#E2574C;" d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843C160.878,195.732,152.878,187.723,143.036,187.723z"/></g></svg> '+err
          })
        })
        this.nameReport = ''
        this.isActive = false
      },
      deleteReport(id){
        this.message = {
          show: true,
          ask: 'Вы точно хотите удалить данный отчет?',
          successBtnText: 'Да',
          cancelBtnText: 'Нет',
          id: id,
          timerStart: true
        }
      },
      response(ans){
        if(ans.response == true){
          this.removeByKey(this.addReport, {
            key: 'id',
            value: ans.id
          })
          this.message = {
            show: false,
          }
        } else {
          this.message = {
            show: false,
          }
        }
      },
      removeByKey(array, params){
        array.some((item, index) => {
          return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
        });
        return array;
      },
      randomColor(){
        const mdColors = [
          '#F44336',
          '#FFEBEE',
          '#FFCDD2',
          '#EF9A9A',
          '#E57373',
          '#EF5350',
          '#F44336',
          '#E53935',
          '#D32F2F',
          '#C62828',
          '#B71C1C',
          '#FF8A80',
          '#e8eaf6',
          '#c5cae9',
          '#9fa8da',
          '#7986cb',
          '#5c6bc0',
          '#3f51b5',
          '#3949ab',
          '#303f9f',
          '#283593',
          '#8c9eff',
          '#536dfe',
          '#3d5afe',
          '#304ffe',
        ]
        let num = Math.floor(Math.random() * mdColors.length)
        return mdColors[num]
      }
    }
  }
</script>