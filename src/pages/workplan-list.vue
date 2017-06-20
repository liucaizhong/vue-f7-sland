<template lang="html">
<f7-page class="workplan-list">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link @click="onBack">
        <f7-icon v-show="!editing" icon="icon-back">
        </f7-icon>
        {{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
    <f7-nav-right>
      <f7-link @click="onEdit" v-show="hasAuthority">{{editTitle}}</f7-link>
    </f7-nav-right>
  </f7-navbar>

  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>

  <f7-block>
    <f7-buttons>
      <f7-button
        tab-link="#tab-1"
        active
      >
      计划详情
      </f7-button>
      <f7-button
        tab-link="#tab-2"
      >
      完成情况
      </f7-button>
    </f7-buttons>

    <f7-tabs swipeable>
      <f7-tab id="tab-1" active>
        <work-plan
          v-for="value in types"
          :planType="value"
          :editing="editing"
          :formContent="configForm(value)"
          :planTitle="configTitle(value)"
        >
        </work-plan>
      </f7-tab>
      <f7-tab id="tab-2">
        <taskProgress>
        </taskProgress>
      </f7-tab>
    </f7-tabs>
  </f7-block>

  <bottom-toolbar page="workplan-list"></bottom-toolbar>
</f7-page>
</template>

<script>
import { PLANTYPES } from '../constant.js'
import Common from '../tools.js'
import WorkPlan from '@/Component/work-plan.vue'
import TaskProgress from '@/Component/task-progress.vue'
import axios from 'axios'
import BottomToolbar from '@/Component/bottom-toolbar.vue'

export default {
  data () {
    return {
      mainTitle: '工作计划',
      loading: false,
      // dep: '',
      // emp: '',
      year: '',
      quarter: '',
      editing: false,
      // hasAuthority: true,
      curUserId: '',
      types: PLANTYPES,
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  created () {
    // set current year and quarter
    let date = new Date()
    this.year = date.getFullYear()
    this.quarter = Math.floor(date.getMonth()/3)
    this.curUserId = this.$route.params.id
    // get workplan
    let url = process.env.NODE_ENV === 'production'
              ? './API/getWP.php'
              : 'http://localhost:3000/getworkplan'

    axios.get(url,{
      params: {
        userId: this.curUserId,
        year: this.year,
        quarter: this.quarter
      }
    })
    .then((response) => {
      console.dir(response)
      let dataObj = response.data
      console.dir(dataObj)
      this.$store.commit('initPlan', dataObj)
      this.loading = false
    })
    .catch((error) => {
      console.log(error)
    })

  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
    hasAuthority: function () {
      return true //for test, will be commented in the future
      // return !this.curUserId.localeCompare(this.$store.state.loginfo.userInfo.userId)
    },
  },
  methods: {
    onEdit () {
      let expandedAccordion = document.querySelectorAll('li.accordion-item-expanded')
      if(expandedAccordion.length) {
        let f7 = this.$f7
        f7.accordionClose(expandedAccordion)
      }
      if(this.editing) {
        // axios send request and eliminate empty object
        let workplan = Object.assign({}, this.$store.state.workplan)
        let updObj = this.types.map((cur) => {
          let willUpdPlan = workplan[cur].willUpdPlan
          willUpdPlan.forEach((val, idx) => {
            if(Common.isEmptyObject(val)) {
              cur.splice(idx, 1)
            }
          })
          return {
            [cur]: willUpdPlan
          }
        }).reduce((total, cur) => {
          return Object.assign(total, cur)
        }, {})

        let url = process.env.NODE_ENV === 'production'
                  ? 'http://slandasset.applinzi.com/workplan/API/updateWP.php'
                  : 'http://localhost:3000/updateworkplan'

        let updData =  Object.assign({
          userId: this.curUserId,
          year: this.year,
          quarter: this.quarter,
        }, updObj)

        console.dir(updData)

        axios.post(url, updData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then((response) => {
          console.log('response back!')
          console.dir(response)
          let res = JSON.parse(response.data)
          console.dir(res)
          this.$store.commit('initPlan', res)
          this.loading = false
          this.editing = !this.editing
        })
        .catch((error) => {
          console.log(error)
        })

      }
      else {
        this.editing = !this.editing
      }
    },
    onBack () {
      let expandedAccordion = document.querySelectorAll('li.accordion-item-expanded')
      if(expandedAccordion.length) {
        let f7 = this.$f7
        f7.accordionClose(expandedAccordion)
      }
      if(this.editing) {
        this.editing = !this.editing
        this.$store.commit('cancelPlan')
      }
      else {
        this.$router.back()
      }
    },
    configForm (type) {
      switch (type) {
        case this.types[0]:
          return [{
            name: 'comp',
            desc: '公司名称'
          },{
            name: 'date',
            desc: '预计调研时间'
          },{
            name: 'event',
            desc: '预期看点'
          }]
          break
        case this.types[1]:
          return [{
            name: 'stock',
            desc: '个股名称'
          },{
            name: 'finishDate',
            desc: '预计完成时间'
          },{
            name: 'reportDate',
            desc: '预计汇报时间'
          }]
          break
        case this.types[2]:
          return [{
            name: 'indus',
            desc: '行业主题'
          },{
            name: 'finishDate',
            desc: '预计完成时间'
          },{
            name: 'reportDate',
            desc: '预计汇报时间'
          }]
          break
      }
    },
    configTitle (type) {
      switch (type) {
        case this.types[0]:
          return '调研计划'
          break
        case this.types[1]:
          return '个股报告计划'
          break
        case this.types[2]:
          return '行业报告计划'
          break
      }
    }
  },
  components: {
    workPlan: WorkPlan,
    taskProgress: TaskProgress,
    bottomToolbar: BottomToolbar,
  }
}
</script>
