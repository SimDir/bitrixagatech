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
        v-for="item in addReport"
        :key="item.id"
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
        <p class="item-date">{{item.created_at}}</p>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import Message from '@/components/Message.vue'
  import Report from '@/components/Report.vue'
  import axios from 'axios'
  import adr from '../serverHelper'
  export default {
    name: 'report',
    components:{
      Message,
      Report
    },
    data(){
      return {
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
    created(){
      this.addReport = this.$store.getters.getReportsList
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
        this.addReport.unshift({
          id: this.id++,
          name: this.nameReport,
          date: new Date()
        })
        let formData =  new FormData()
        formData.append('name', this.nameReport)
        formData.append('date', new Date())
        axios
        .post(adr+'/addReports.php', formData)
        .then(response => {
          this.$swal({
              text: response.data
          });
        })
        .catch(err => {
          this.errors.push(err)
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
    }, 
    mounted(){
      this.$store.dispatch('getReports');
    }
  }
</script>