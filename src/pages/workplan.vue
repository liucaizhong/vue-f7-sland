<template lang="html">
<f7-page class="workplan">
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
      <f7-link @click="onEdit">{{editTitle}}</f7-link>
    </f7-nav-right>
  </f7-navbar>
  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>
  <f7-block-title>筛选条件</f7-block-title>
  <f7-list form id="workplan-form">
    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="部门"
      v-if="hasAuthority"
    >
      <!-- <f7-label>部门</f7-label> -->
      <select name="dep" v-model="dep">
        <!-- <option value="" data-default disabled>部门</option> -->
        <option value="0">投资部</option>
        <option value="1">研究部</option>
        <option value="2">固收部</option>
        <option value="3">投资2部</option>
        <option value="4">研究2部</option>
        <option value="5">固收2部</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="员工"
      v-if="hasAuthority"
    >
      <!-- <f7-label>人员</f7-label> -->
      <select name="emp" v-model="emp">
        <!-- <option value="" data-default disabled>人员</option> -->
        <option value="0">刘一</option>
        <option value="1">刘二</option>
        <option value="2">刘三</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="年度"
    >
      <!-- <f7-label>年度</f7-label> -->
      <select name="year" v-model="year">
        <!-- <option value="" data-default disabled>年度</option> -->
        <option value="0">{{curYear-1}}</option>
        <option value="1">{{curYear}}</option>
        <option value="2">{{curYear+1}}</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="季度"
    >
      <!-- <f7-label>季度</f7-label> -->
      <select name="quarter" v-model="quarter">
        <!-- <option value="" data-default disabled>季度</option> -->
        <option value="0">第一季度</option>
        <option value="1">第二季度</option>
        <option value="2">第三季度</option>
        <option value="3">第四季度</option>
      </select>
    </f7-list-item>
  </f7-list>

  <!-- 调研计划 -->
  <work-plan
    v-for="value in types"
    :planType="value"
    :editing="editing"
    :formContent="configForm(value)"
    :planTitle="configTitle(value)"
  >
  </work-plan>

</f7-page>
</template>

<script>
import { PLANTYPES } from '../constant.js'
import WorkPlan from '@/Component/work-plan.vue'

export default {
  data () {
    return {
      mainTitle: '工作计划',
      loading: false,
      dep: '',
      emp: '',
      year: '1',
      quarter: '',
      editing: false,
      hasAuthority: true,
      types: PLANTYPES,
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  created () {
    // get loginfo and workplan
    // to do further
    this.$store.commit('init', {
      [this.types[0]]: [{
        id: '001',
        comp: '中航机电',
        date: '2017.12.01',
        event: '期待上涨'
      },{
        id: '002',
        comp: '中航飞机',
        date: '2017.11.01',
        event: '期待上涨'
      },{
        id: '003',
        comp: '中直股份',
        date: '2017.10.01',
        event: '期待上涨'
      }],
      [this.types[1]]: [],
      [this.types[2]]: []
    })
    // set current quarter
    this.quarter = this.curQuarter
    // register global touchstart event handler
    let $$ = this.$$
    $$(document).on('touchstart', (e)=>{
      let delLi = $$("li.li-transition[style='transform: translateX(-60px);']")
      let isDelBtn = $$(e.target).hasClass('delete-btn')
      if(!isDelBtn && delLi.length) {
        console.log('delete cancel')
        e.preventDefault()
        e.stopImmediatePropagation()
        Array.prototype.forEach.call(delLi, (cur)=>{
          cur.style.transform = 'translateX(0)'
        })
      }
    }, {
      capture: true,
      passive: false
    })
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
    curYear: function () {
      let date = new Date()
      return date.getFullYear()
    },
    curQuarter: function () {
      let date = new Date()
      return Math.floor(date.getMonth()/3)
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
        // axios send request
        // todo...
        this.$store.commit('save')
        this.editing = !this.editing
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
        this.$store.commit('cancel')
      }
      else {
        if(this.isDev) {
          this.$router.back()
        }
        else {
          window.location.href = '/index.php'
        }
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

          break
        case this.types[2]:

          break
      }
    },
    configTitle (type) {
      switch (type) {
        case this.types[0]:
          return '调研计划'
          break
        case this.types[1]:

          break
        case this.types[2]:

          break
      }
    }
  },
  components: {
    workPlan: WorkPlan
  }
}
</script>
