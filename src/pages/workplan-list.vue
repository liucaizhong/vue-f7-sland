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
          :showDelBtn="showDelBtn"
        >
        </work-plan>
      </f7-tab>
      <f7-tab id="tab-2">
        <taskProgress>
        </taskProgress>
      </f7-tab>
    </f7-tabs>
  </f7-block>

</f7-page>
</template>

<script>
import { PLANTYPES } from '../constant.js'
import WorkPlan from '@/Component/work-plan.vue'
import TaskProgress from '@/Component/task-progress.vue'

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
      hasAuthority: true,
      types: PLANTYPES,
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  created () {
    // set current year and quarter
    let date = new Date()
    this.year = date.getFullYear()
    this.quarter = Math.floor(date.getMonth()/3)

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

  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
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
    workPlan: WorkPlan,
    taskProgress: TaskProgress
  }
}
</script>
